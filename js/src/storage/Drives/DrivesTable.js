/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";
import { formFieldsSize } from "foris";

import DriveTableRow from "./DrivesTableRow";

DrivesTable.propTypes = {
    drives: PropTypes.arrayOf(PropTypes.shape({
        dev: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        fs: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
    })).isRequired,
    selectedDrives: PropTypes.arrayOf(PropTypes.string).isRequired,
    setSelectedDrives: PropTypes.func.isRequired,
    currentUUID: PropTypes.string.isRequired,
    storageIsPending: PropTypes.bool.isRequired,
};

export default function DrivesTable({
    drives, selectedDrives, setSelectedDrives, currentUUID, storageIsPending,
}) {
    return (
        <table className={`table table-hover ${formFieldsSize}`}>
            <thead>
                <tr>
                    <th scope="col">{_("Device")}</th>
                    <th scope="col">{_("Description")}</th>
                    <th scope="col">{_("Filesystem")}</th>
                    <th scope="col">{_("UUID")}</th>
                </tr>
            </thead>
            <tbody>
                {drives.map((drive) => (
                    <DriveTableRow
                        key={drive.dev}
                        drive={drive}
                        isSelected={selectedDrives.includes(drive.dev)}
                        setSelectedDrives={setSelectedDrives}
                        active={!!currentUUID && currentUUID === drive.uuid}
                        disabled={storageIsPending}
                    />
                ))}
            </tbody>
        </table>
    );
}
