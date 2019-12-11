/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import { CheckBox } from "foris";
import update from "immutability-helper";
import PropTypes from "prop-types";

DriveTableRow.propTypes = {
    drive: PropTypes.shape({
        dev: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        fs: PropTypes.string.isRequired,
        uuid: PropTypes.string.isRequired,
    }).isRequired,
    isSelected: PropTypes.bool.isRequired,
    setSelectedDrives: PropTypes.func.isRequired,
    active: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default function DriveTableRow({
    drive, isSelected, setSelectedDrives, active, disabled,
}) {
    function select() {
        setSelectedDrives((selectedDrives) => {
            const index = selectedDrives.indexOf(drive.dev);
            if (index > -1) {
                return update(selectedDrives, { $splice: [[index, 1]] });
            }
            return update(selectedDrives, { $push: [drive.dev] });
        });
    }

    return (
        <tr className={active ? "table-active" : ""}>
            <td>
                <CheckBox
                    checked={isSelected}
                    label={drive.dev}
                    onChange={select}
                    disabled={disabled}
                />
            </td>
            <td>{drive.description}</td>
            <td>{drive.fs}</td>
            <td>{drive.uuid}</td>
        </tr>
    );
}
