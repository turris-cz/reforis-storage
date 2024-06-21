/*
 * Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Radio } from "foris";
import PropTypes from "prop-types";

UUIDsTableRow.propTypes = {
    drives: PropTypes.arrayOf(
        PropTypes.shape({
            dev: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            fs: PropTypes.string.isRequired,
            uuid: PropTypes.string.isRequired,
        })
    ).isRequired,
    uuid: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    setSelectedUUID: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
};

export default function UUIDsTableRow({
    drives,
    uuid,
    selected,
    setSelectedUUID,
    disabled,
}) {
    const devices = drives.map((drive) => drive.dev).join(", ");

    return (
        <tr>
            <td>
                <Radio
                    label={devices}
                    id={uuid}
                    name="uuids"
                    value={uuid}
                    checked={selected}
                    onChange={() => {
                        setSelectedUUID(uuid);
                    }}
                    disabled={disabled}
                    className="mb-0"
                />
            </td>
            <td>{uuid}</td>
        </tr>
    );
}
