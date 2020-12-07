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

import diffSnapshot from "snapshot-diff";
import { mockJSONError } from "foris/testUtils/network";
import { mockSetAlert } from "foris/testUtils/alertContextMock";
import drives from "../../__tests__/__fixtures__/drives";
import Drives from "../Drives";

describe("<Drives />", () => {
    let container;
    let asFragment;

    beforeEach(() => {
        ({ container, asFragment } = render(
            <>
                <div id="modal-container" />
                <Drives currentUUID="" storageIsPending={false} {...drives} />
            </>
        ));
    });

    it("Should render.", () => {
        expect(container).toMatchSnapshot();
    });

    it("Button should be disabled when nothing is selected.", () => {
        expect(getByText(container, "Format & Set").disabled).toBeTruthy();
    });

    it("Button should be enabled when some disk is selected.", () => {
        fireEvent.click(getByLabelText(container, "sdb"));
        expect(getByText(container, "Format & Set").disabled).toBeFalsy();
    });

    it("Button should be disabled when RAID1 and less that two disks are selected.", () => {
        fireEvent.change(getByLabelText(container, "RAID"), {
            target: { value: "raid1" },
        });
        fireEvent.click(getByLabelText(container, "sdb"));
        expect(getByText(container, "Format & Set").disabled).toBeTruthy();

        fireEvent.click(getByLabelText(container, "sdc"));
        expect(getByText(container, "Format & Set").disabled).toBeFalsy();
    });

    it("Should render modal on Format&Set click.", () => {
        fireEvent.change(getByLabelText(container, "RAID"), {
            target: { value: "single" },
        });
        fireEvent.click(getByLabelText(container, "sdb"));
        fireEvent.click(getByLabelText(container, "sdc"));
        const firstRender = asFragment();

        fireEvent.click(getByText(container, "Format & Set"));
        getByText(container, "Continue");

        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });

    it("Should post on 'Continue' button click.", () => {
        fireEvent.change(getByLabelText(container, "RAID"), {
            target: { value: "single" },
        });
        fireEvent.click(getByLabelText(container, "sdb"));
        fireEvent.click(getByLabelText(container, "sdc"));
        fireEvent.click(getByText(container, "Format & Set"));
        fireEvent.click(getByText(container, "Continue"));

        const data = {
            drives: ["sdb", "sdc"],
            raid: "single",
        };
        expect(mockAxios.post).toHaveBeenCalledWith(
            "/reforis/storage/api/prepare-srv",
            data,
            expect.anything()
        );
    });

    it("Should handle post error.", async () => {
        fireEvent.click(getByLabelText(container, "sdb"));
        fireEvent.click(getByText(container, "Format & Set"));
        fireEvent.click(getByText(container, "Continue"));
        mockJSONError();
        await wait(() =>
            expect(mockSetAlert).toBeCalledWith("Device preparation failed.")
        );
    });
});
