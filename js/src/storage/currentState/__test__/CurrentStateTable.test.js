/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { render } from "foris/testUtils/customTestRender";

import diffSnapshot from "snapshot-diff";
import state from "../../__tests__/__fixtures__/state";
import CurrentStateTable from "../CurrentStateTable";

describe("<CurrentStateTable />", () => {
    let rerender;
    let asFragment;
    let firstRender;

    beforeEach(() => {
        ({ rerender, asFragment } = render(<CurrentStateTable
            storageIsPending={false}
            {...state()}
        />));
        firstRender = asFragment();
    });

    it("Should render.", () => {
        expect(firstRender).toMatchSnapshot();
    });

    it("Should render spinner when storage is pending.", () => {
        rerender(
            <CurrentStateTable
                {...state()}
                state="formatting"
                storageIsPending
            />,
        );

        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });

    it("Should hide device if no device selected.", () => {
        rerender(
            <CurrentStateTable
                {...state()}
                old_device_desc=""
                storageIsPending={false}
                old_uuid="broken"
            />,
        );
        expect(diffSnapshot(firstRender, asFragment())).toMatchSnapshot();
    });
});
