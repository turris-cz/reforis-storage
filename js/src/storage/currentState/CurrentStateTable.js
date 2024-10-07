/*
 * Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { faHdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
        <div className="row no-gutters justify-content-center">
            <div className="col-md-6 d-flex flex-column align-items-center justify-content-center">
                <FontAwesomeIcon icon={faHdd} size="4x" className="mb-2" />
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
                                                    <SpinnerElement
                                                        small
                                                        className="text-primary"
                                                    >
                                                        {STORAGE_STATES[state]}
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
    );
}
