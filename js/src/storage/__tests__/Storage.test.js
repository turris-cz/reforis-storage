/*
 * Copyright (C) 2019-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { render, wait } from "foris/testUtils/customTestRender";
import { WebSockets } from "foris";

import Storage from "../Storage";
import mockAxios from "jest-mock-axios";
import drives from "./__fixtures__/drives";
import getStateFixture from "./__fixtures__/getStateFixture";

describe("<Storage />", () => {
    let container;
    let getByText;
    let getByLabelText;
    let getAllByLabelText;

    beforeEach(() => {
        const ws = new WebSockets();
        ({ container, getByText, getByLabelText, getAllByLabelText } = render(
            <Storage ws={ws} />
        ));
    });

    it("Should render.", async () => {
        mockAxios.mockResponse({ data: getStateFixture() });
        mockAxios.mockResponse({ data: drives });
        mockAxios.mockResponse({ data: { disk_mounted: true } });

        await wait(() => getByText("Storage"));
        expect(container).toMatchSnapshot();
    });

    it("Should handle pending states.", async () => {
        mockAxios.mockResponse({ data: getStateFixture(true) });
        mockAxios.mockResponse({ data: drives });
        mockAxios.mockResponse({ data: { disk_mounted: true } });
        await wait(() => getByText("Formatting"));
        expect(container).toMatchSnapshot();
    });

    it("Should handle empty drives list.", async () => {
        mockAxios.mockResponse({ data: getStateFixture() });
        mockAxios.mockResponse({ data: { drives: [] } });
        mockAxios.mockResponse({ data: { disk_mounted: false } });
        await wait(() => getByText(/No drives connected/));
    });
});
