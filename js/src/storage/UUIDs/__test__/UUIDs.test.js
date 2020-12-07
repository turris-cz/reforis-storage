/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {
    render,
    wait,
    fireEvent,
    getByText,
    getByLabelText,
} from "foris/testUtils/customTestRender";
import mockAxios from "jest-mock-axios";

import { mockJSONError } from "foris/testUtils/network";
import { mockSetAlert } from "foris/testUtils/alertContextMock";
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

    it("Should post on 'Set UUID' button click.", () => {
        fireEvent.click(getByLabelText(container, "sdc"));
        fireEvent.click(getByText(container, "Set UUID"));

        const data = { uuid: "4444" };
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/storage/api/update-srv",
            data,
            expect.anything()
        );
    });

    it("Should post on 'Unset UUID' button click.", async () => {
        fireEvent.click(getByText(container, "Unset UUID"));

        const data = { uuid: "" };
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/storage/api/update-srv",
            data,
            expect.anything()
        );
    });

    it("Should call updateUUIDCallback when 'Unset UUID' button click.", async () => {
        expect(updateUUIDCallback).not.toBeCalled();
        fireEvent.click(getByText(container, "Unset UUID"));
        mockAxios.mockResponse({ result: true });
        await wait(() => expect(updateUUIDCallback).toBeCalled());
    });

    it("Should call updateUUIDCallback when 'Set UUID' button click.", async () => {
        expect(updateUUIDCallback).not.toBeCalled();
        fireEvent.click(getByText(container, "Set UUID"));
        mockAxios.mockResponse({ result: true });
        await wait(() => expect(updateUUIDCallback).toBeCalled());
    });

    it("Should handle set UUID post error.", async () => {
        fireEvent.click(getByText(container, "Set UUID"));
        mockJSONError();
        await wait(() =>
            expect(mockSetAlert).toBeCalledWith("UUID selection failed.")
        );
    });

    it("Should handle unset UUID post error.", async () => {
        fireEvent.click(getByText(container, "Unset UUID"));
        mockJSONError();
        await wait(() =>
            expect(mockSetAlert).toBeCalledWith("UUID selection failed.")
        );
    });
});
