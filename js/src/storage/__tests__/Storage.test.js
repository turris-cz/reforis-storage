/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { render } from "customTestRender";

import Storage from "../Storage";

describe("<Storage />", () => {
    it("should render component", () => {
        const { container, getByText } = render(<Storage />);
        expect(getByText("Storage")).toBeDefined();
    });
});
