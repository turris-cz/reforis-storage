/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Alert, ALERT_TYPES, RebootButton } from "foris";

const PENDING_MIGRATION_TEXT = _(`
Your router is <b>waiting for restart</b> to proceed with migrating your data to the newly selected drive. Please
restart your router <b>as soon as possible</b> but bear in mind that the next reboot will take longer as all data need
to be migrated.
`);

export default function PendingMigrationAlert() {
    return (
        <Alert type={ALERT_TYPES.WARNING}>
            <div className="d-flex flex-column flex-lg-row align-items-center">
                <div className="col-sm-12 col-lg-10 text-center text-md-center text-lg-left mb-2 mb-lg-0">
                    <span
                        dangerouslySetInnerHTML={{
                            __html: PENDING_MIGRATION_TEXT,
                        }}
                    />
                </div>
                <div className="col-sm-12 col-lg-2">
                    <RebootButton className="btn btn-danger col-sm-12" />
                </div>
            </div>
        </Alert>
    );
}
