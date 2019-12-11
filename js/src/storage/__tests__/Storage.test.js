/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {render, wait} from "foris/testUtils/customTestRender";

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
        ({container, getByText, getByLabelText, getAllByLabelText} = render(<Storage/>));
    });

    it("should render", async () => {
        mockAxios.mockResponse({data: state()});
        mockAxios.mockResponse({data: drives});

        await wait(() => getByText("Storage"));
        expect(container).toMatchSnapshot();
    });

    it("should hold pending states", async () => {
        mockAxios.mockResponse({data: state(true)});
        mockAxios.mockResponse({data: drives});
        await wait(() => getByText("Formatting"));
        expect(getByLabelText("RAID").disabled).toBeTruthy();
        expect(getByLabelText("sdc1").disabled).toBeTruthy();
        expect(getAllByLabelText("sdc")[1].disabled).toBeTruthy();
    });
});
