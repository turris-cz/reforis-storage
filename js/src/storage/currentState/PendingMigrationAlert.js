/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Alert, ALERT_TYPES, RebootButton } from "foris";

export default function PendingMigrationAlert() {
    return (
        <Alert type={ALERT_TYPES.WARNING}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center">
                <div className="d-flex flex-column mb-3 mb-md-0 me-0 me-md-3">
                    <p
                        className="mb-1"
                        dangerouslySetInnerHTML={{
                            __html: _(
                                "Your router is <b>waiting for restart</b> to proceed with migrating your data to the newly selected drive."
                            ),
                        }}
                    />
                    <p
                        className="mb-0"
                        dangerouslySetInnerHTML={{
                            __html: _(
                                _(
                                    "Please restart your router <b>as soon as possible</b>, but bear in mind that the next reboot will take longer as all the data need to be migrated."
                                )
                            ),
                        }}
                    />
                </div>
                <RebootButton className="col-12 col-md-4 col-lg-2 btn btn-danger" />
            </div>
        </Alert>
    );
}
