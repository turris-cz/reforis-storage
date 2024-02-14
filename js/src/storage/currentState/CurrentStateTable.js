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
    current_device: PropTypes.string.isRequired,
    storageIsPending: PropTypes.bool.isRequired,
};

export default function CurrentStateTable({
    state,
    current_device,
    uuid,
    raid,
    storageIsPending,
}) {
    return (
        <div className="mb-3">
            <div className="row no-gutters justify-content-center">
                <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <i className="fas fa-hdd fa-4x mb-1" />
                    <h5>{current_device}</h5>
                </div>
                <div className="col-md-6">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-borderless table-hover">
                                <tbody>
                                    {!Object.keys(
                                        NOT_PENDING_STORAGE_STATES
                                    ).includes(state) && (
                                        <tr>
                                            <th scope="row">{_("State")}</th>
                                            <td>
                                                <div className="d-flex flex-row">
                                                    {storageIsPending ? (
                                                        <SpinnerElement small>
                                                            &nbsp;
                                                            {
                                                                STORAGE_STATES[
                                                                    state
                                                                ]
                                                            }
                                                        </SpinnerElement>
                                                    ) : (
                                                        STORAGE_STATES[state]
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                    {current_device !== "none" && (
                                        <tr>
                                            <th scope="row">{_("Device")}</th>
                                            <td>{current_device}</td>
                                        </tr>
                                    )}
                                    <tr>
                                        <th scope="row">{_("UUID")}</th>
                                        <td>{uuid === "" ? _("N/A") : uuid}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">{_("RAID")}</th>
                                        <td>{raid}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
