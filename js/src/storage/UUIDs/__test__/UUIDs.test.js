/*
 * Copyright (C) 2019-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { mockSetAlert } from "foris/testUtils/alertContextMock";
import {
    render,
    wait,
    fireEvent,
    getByLabelText,
    getByTestId,
} from "foris/testUtils/customTestRender";
import { mockJSONError } from "foris/testUtils/network";
import mockAxios from "jest-mock-axios";

import drives from "../../__tests__/__fixtures__/drives";
import UUIDs from "../UUIDs";

describe("<UUIDs />", () => {
    let container;
    const updateUUIDCallback = jest.fn();
    beforeEach(() => {
        ({ container } = render(
            <UUIDs
                currentUUID=""
                storageIsPending={false}
                updateUUIDCallback={updateUUIDCallback}
                {...drives}
            />
        ));
    });

    it("Should render.", () => {
        expect(container).toMatchSnapshot();
    });

    it("Should post on 'Use drive' button click.", () => {
        fireEvent.click(getByLabelText(container, "sdc"));
        fireEvent.click(getByTestId(container, "use-drive-btn"));

        const data = { uuid: "4444" };
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/storage/api/update-srv",
            data,
            expect.anything()
        );
    });

    it("Should post on 'Disable external storage' button click.", async () => {
        fireEvent.click(getByLabelText(container, "sdc"));
        fireEvent.click(getByTestId(container, "disable-external-storage-btn"));

        const data = { uuid: "" };
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/storage/api/update-srv",
            data,
            expect.anything()
        );
    });

    it("Should call updateUUIDCallback when 'Disable external storage' button click.", async () => {
        expect(updateUUIDCallback).not.toBeCalled();
        fireEvent.click(getByLabelText(container, "sdc"));
        fireEvent.click(getByTestId(container, "disable-external-storage-btn"));
        mockAxios.mockResponse({ result: true });
        await wait(() => expect(updateUUIDCallback).toBeCalled());
    });

    it("Should call updateUUIDCallback when 'Use drive' button click.", async () => {
        expect(updateUUIDCallback).not.toBeCalled();
        fireEvent.click(getByLabelText(container, "sdc"));
        fireEvent.click(getByTestId(container, "use-drive-btn"));
        mockAxios.mockResponse({ result: true });
        await wait(() => expect(updateUUIDCallback).toBeCalled());
    });

    it("Should handle Use drive post error.", async () => {
        fireEvent.click(getByLabelText(container, "sdc"));
        fireEvent.click(getByTestId(container, "use-drive-btn"));
        mockJSONError();
        await wait(() =>
            expect(mockSetAlert).toBeCalledWith("Drive selection failed.")
        );
    });

    it("Should handle Disable external storage post error.", async () => {
        fireEvent.click(getByLabelText(container, "sdc"));
        fireEvent.click(getByTestId(container, "disable-external-storage-btn"));
        mockJSONError();
        await wait(() =>
            expect(mockSetAlert).toBeCalledWith("Drive selection failed.")
        );
    });
});
