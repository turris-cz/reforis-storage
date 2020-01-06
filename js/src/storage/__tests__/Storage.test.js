/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {render, wait} from "foris/testUtils/customTestRender";
import {WebSockets} from "foris";

import Storage from "../Storage";
import mockAxios from 'jest-mock-axios';
import drives from './__fixtures__/drives';
import state from './__fixtures__/state';

describe("<Storage />", () => {
    let container;
    let getByText;
    let getByLabelText;
    let getAllByLabelText;

    beforeEach(() => {
        const ws = new WebSockets();
        ({container, getByText, getByLabelText, getAllByLabelText} = render(<Storage ws={ws}/>));
    });

    it("Should render.", async () => {
        mockAxios.mockResponse({data: state()});
        mockAxios.mockResponse({data: drives});

        await wait(() => getByText("Storage"));
        expect(container).toMatchSnapshot();
    });

    it("Should handle pending states.", async () => {
        mockAxios.mockResponse({data: state(true)});
        mockAxios.mockResponse({data: drives});
        await wait(() => getByText("Formatting"));
        expect(getByLabelText("RAID").disabled).toBeTruthy();
        expect(getByLabelText("sdc1").disabled).toBeTruthy();
        expect(getAllByLabelText("sdc")[1].disabled).toBeTruthy();
        expect(getByText("Set UUID").disabled).toBeTruthy();
        expect(getByText("Unset UUID").disabled).toBeTruthy();
    });

    it("Should handle empty drives list.", async () => {
        mockAxios.mockResponse({data: state()});
        mockAxios.mockResponse({data: {drives:[]}});
        await wait(() => getByText(/No drives connected/));
    });
});
