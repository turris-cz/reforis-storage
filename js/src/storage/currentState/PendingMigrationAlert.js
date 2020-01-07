/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { Alert, ALERT_TYPES, RebootButton } from "foris";
import React from "react";

const PENDING_MIGRATION_TEXT = _(`
Your router is <b>waiting for restart</b> to proceed with migrating your data to the newly selected drive. Please
restart your router <b>as soon as possible</b> but bear in mind that the next reboot will take longer as all data need
to be migrated.
`);

export default function PendingMigrationAlert() {
    return (
        <Alert type={ALERT_TYPES.WARNING}>
            <p dangerouslySetInnerHTML={{ __html: PENDING_MIGRATION_TEXT }} />
            <RebootButton forisFormSize />
        </Alert>
    );
}
