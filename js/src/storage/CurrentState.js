/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import {
    Alert, ALERT_TYPES, RebootButton, SpinnerElement,
} from "foris";

import { NOT_PENDING_STORAGE_STATES, STORAGE_STATES } from "./constants";

export default function CurrentState({
    state, raid, uuid, old_uuid, old_device_desc, storageIsPending,
}) {
    const pendingMigration = old_uuid !== uuid;
    const brokenSetup = old_uuid === "broken";
    return (
        <>
            {!brokenSetup && pendingMigration
            && <PendingMigration old_uuid={old_uuid} old_device_desc={old_device_desc} />}

            {brokenSetup
            && <BrokenSetup />}

            <table className="table table-borderless table-hover offset-lg-1 col-lg-10 col-sm-12">
                <tbody>
                    {!Object.keys(NOT_PENDING_STORAGE_STATES).includes(state) && (
                        <tr>
                            <th scope="row">{_("State")}</th>
                            <td style={{ display: "flex", flexDirection: "row" }}>
                                {storageIsPending ? (
                                    <SpinnerElement small>
                                        {STORAGE_STATES[state]}
                                    </SpinnerElement>
                                ) : STORAGE_STATES[state]}
                            </td>
                        </tr>
                    )}
                    {old_device_desc !== "none"
                    && (
                        <tr>
                            <th scope="row">{_("Device")}</th>
                            <td>{old_device_desc}</td>
                        </tr>
                    )}
                    <tr>
                        <th scope="row">{_("UUID")}</th>
                        <td>{uuid}</td>
                    </tr>
                    <tr>
                        <th scope="row">{_("RAID")}</th>
                        <td>{raid}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

const PENDING_MIGRATION_TEXT = _(`
Your router is <b>waiting for restart</b> to proceed with migrating your data to the newly selected drive. Please
restart your router <b>as soon as possible</b> but bear in mind that the next reboot will take longer as all data need
to be migrated.
`);

function PendingMigration() {
    return (
        <Alert type={ALERT_TYPES.WARNING}>
            <p dangerouslySetInnerHTML={{ __html: PENDING_MIGRATION_TEXT }} />
            <RebootButton forisFormSize />
        </Alert>
    );
}

function BrokenSetup() {
    return (
        <Alert>
            <span>
                {_("Your setup is currently broken and you are probably loosing data, set a new storage device as soon as you can!")}
            </span>
        </Alert>
    );
}
