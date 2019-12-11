/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

UUIDsTableRow.propTypes = {
    drives: PropTypes.arrayOf(
        PropTypes.shape({
            dev: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            fs: PropTypes.string.isRequired,
            uuid: PropTypes.string.isRequired,
        }),
    ).isRequired,
    uuid: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    setSelectedUUID: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default function UUIDsTableRow({
    drives, uuid, selected, setSelectedUUID, disabled,
}) {
    const devices = drives.map((drive) => drive.dev).join(", ");

    return (
        <tr className={selected ? "table-active" : ""}>
            <td>
                <div className="custom-control custom-radio">
                    <input
                        checked={selected}
                        type="radio"
                        id={uuid}
                        value={uuid}
                        name="uuids"
                        className="custom-control-input"
                        onChange={() => {
                            setSelectedUUID(uuid);
                        }}
                        disabled={disabled}
                    />
                    <label className="custom-control-label" htmlFor={uuid}>
                        {devices}
                    </label>
                </div>
            </td>
            <td>
                {uuid}
            </td>
        </tr>
    );
}
