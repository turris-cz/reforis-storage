import React from "react";

export default function UUIDsTableRow({
    uuid, drives, selected, setSelectedUUID, disabled,
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
