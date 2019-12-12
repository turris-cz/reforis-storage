/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {
    render, wait, fireEvent, getByText, getByLabelText,
} from "foris/testUtils/customTestRender";
import mockAxios from "jest-mock-axios";

import { mockJSONError } from "foris/testUtils/network";
import { mockSetAlert } from "foris/testUtils/alertContextMock";
import drives from "../../__tests__/__fixtures__/drives";
import UUIDs from "../UUIDs";

describe("<UUIDs />", () => {
    let container;

    beforeEach(() => {
        ({ container } = render(
            <UUIDs
                currentUUID=""
                storageIsPending={false}
                {...drives}
            />,
        ));
    });

    it("should render", () => {
        expect(container).toMatchSnapshot();
    });

    it("should post on 'Set UUID' button click", () => {
        fireEvent.click(getByLabelText(container, "sdc"));
        fireEvent.click(getByText(container, "Set UUID"));

        const data = { uuid: "4444" };
        expect(mockAxios.post)
            .toHaveBeenCalledWith("/reforis/storage/api/update-srv", data, expect.anything());
    });

    it("should post on 'Unset UUID' button click", async () => {
        fireEvent.click(getByText(container, "Unset UUID"));

        const data = { uuid: "" };
        expect(mockAxios.post)
            .toHaveBeenCalledWith("/reforis/storage/api/update-srv", data, expect.anything());
    });

    it("should hold set UUID post error", async () => {
        fireEvent.click(getByText(container, "Set UUID"));
        mockJSONError();
        await wait(() => expect(mockSetAlert).toBeCalledWith("UUID selection was failed."));
    });

    it("should hold unset UUID post error", async () => {
        fireEvent.click(getByText(container, "Unset UUID"));
        mockJSONError();
        await wait(() => expect(mockSetAlert).toBeCalledWith("UUID selection was failed."));
    });
});
