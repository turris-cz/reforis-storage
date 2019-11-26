import update from "immutability-helper";
import { CheckBox } from "foris";
import React from "react";

export function DriveTableRow({
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
