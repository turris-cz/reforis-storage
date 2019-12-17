/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { render, getByText } from "foris/testUtils/customTestRender";

import CurrentState from "../CurrentState";
import state from "../../__tests__/__fixtures__/state";

describe("<CurrentState />", () => {
    let container;
    let rerender;

    beforeEach(() => {
        ({ container, rerender } = render(<CurrentState storageIsPending={false} {...state()} />));
    });

    it("Should render.", () => {
        expect(container).toMatchSnapshot();
    });

    it("Should render <PendingMigration/> on differnet uuid and old_uuid.", () => {
        rerender(
            <CurrentState
                storageIsPending={false}
                {...state()}
                uuid="111"
                old_uuid="222"
            />,
        );
        getByText(container, /waiting for restart/);
    });

    it("Should render <BrokenSetupAlert/> old_uuid broken.", () => {
        rerender(
            <CurrentState
                storageIsPending={false}
                {...state()}
                old_uuid="broken"
            />,
        );
        getByText(container, /Your setup is currently broken/);
    });
});
