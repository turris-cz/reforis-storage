/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { SpinnerElement } from "foris";
import PropTypes from "prop-types";

import { NOT_PENDING_STORAGE_STATES, STORAGE_STATES } from "../constants";

CurrentStateTable.propTypes = {
    state: PropTypes.string.isRequired,
    raid: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
    old_device_desc: PropTypes.string.isRequired,
    storageIsPending: PropTypes.bool.isRequired,
};

export default function CurrentStateTable({
    state, old_device_desc, uuid, raid, storageIsPending,
}) {
    return (
        <table className="table table-borderless table-hover offset-lg-1 col-lg-10 col-sm-12">
            <tbody>
                {!Object.keys(NOT_PENDING_STORAGE_STATES).includes(state) && (
                    <tr>
                        <th scope="row">{_("State")}</th>
                        <td style={{ display: "flex", flexDirection: "row" }}>
                            {storageIsPending ? (
                                <SpinnerElement small>
                                    {STORAGE_STATES[state]}
                                </SpinnerElement>
                            ) : STORAGE_STATES[state]}
                        </td>
                    </tr>
                )}
                {old_device_desc !== "none"
                    && (
                        <tr>
                            <th scope="row">{_("Device")}</th>
                            <td>{old_device_desc}</td>
                        </tr>
                    )}
                <tr>
                    <th scope="row">{_("UUID")}</th>
                    <td>{uuid}</td>
                </tr>
                <tr>
                    <th scope="row">{_("RAID")}</th>
                    <td>{raid}</td>
                </tr>
            </tbody>
        </table>
    );
}
