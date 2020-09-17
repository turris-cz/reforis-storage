/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
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
    state,
    old_device_desc,
    uuid,
    raid,
    storageIsPending,
}) {
    return (
        <div className="table-responsive">
            <table className="table table-hover">
                <thead className="thead-light">
                    <tr>
                        {old_device_desc !== "none" && (
                            <th scope="col">{_("Device")}</th>
                        )}
                        {!Object.keys(NOT_PENDING_STORAGE_STATES).includes(
                            state,
                        ) && <th scope="col">{_("State")}</th>}
                        <th scope="col">UUID</th>
                        <th scope="col">RAID</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {old_device_desc !== "none" && (
                            <td>{old_device_desc}</td>
                        )}
                        {!Object.keys(NOT_PENDING_STORAGE_STATES).includes(
                            state,
                        ) && (
                            <td>
                                <div className="d-flex flex-row">
                                    {storageIsPending ? (
                                        <SpinnerElement small>
                                            &nbsp;
                                            {STORAGE_STATES[state]}
                                        </SpinnerElement>
                                    ) : (
                                        STORAGE_STATES[state]
                                    )}
                                </div>
                            </td>
                        )}
                        <td>{uuid}</td>
                        <td>{raid}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
