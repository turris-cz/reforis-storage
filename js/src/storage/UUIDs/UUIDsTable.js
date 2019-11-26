import React from "react";
import { formFieldsSize } from "foris";
import UUIDsTableRow from "./UUIDsTableRow";

export default function UUIDsTable({
    drivesByUUIDs, selectedUUID, setSelectedUUID, storageIsPending,
}) {
    // TODO: Add possibility to choose empty UUID
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
