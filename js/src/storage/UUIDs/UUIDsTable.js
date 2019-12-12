/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import { formFieldsSize } from "foris";
import UUIDsTableRow from "./UUIDsTableRow";

UUIDsTable.propTypes = {
    drivesByUUIDs: PropTypes.object.isRequired,
    selectedUUID: PropTypes.string.isRequired,
    setSelectedUUID: PropTypes.func.isRequired,
    storageIsPending: PropTypes.bool.isRequired,
};

export default function UUIDsTable({
    drivesByUUIDs, selectedUUID, setSelectedUUID, storageIsPending,
}) {
    return (
        <table className={`table table-hover ${formFieldsSize}`}>
            <thead>
                <tr>
                    <th scope="col">{_("Devices")}</th>
                    <th scope="col">{_("UUID")}</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(drivesByUUIDs).map((uuid) => (
                    <UUIDsTableRow
                        key={uuid}
                        uuid={uuid}
                        drives={drivesByUUIDs[uuid]}
                        selected={uuid && uuid === selectedUUID}
                        setSelectedUUID={setSelectedUUID}
                        disabled={storageIsPending}
                    />
                ))}
            </tbody>
        </table>
    );
}
