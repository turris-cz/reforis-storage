/*
 * Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Button } from "foris";
import PropTypes from "prop-types";

UUIDsActionButtons.propTypes = {
    onUnselectSrv: PropTypes.func.isRequired,
    onUpdateSrv: PropTypes.func.isRequired,
    buttonIsDisabled: PropTypes.bool.isRequired,
};

export default function UUIDsActionButtons({
    onUnselectSrv,
    onUpdateSrv,
    buttonIsDisabled,
}) {
    return (
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Button
                data-testid="disable-external-storage-btn"
                className="btn-primary col-sm-12 col-md-4 col-lg-2 mr-md-2 mb-0 mb-md-0"
                disabled={buttonIsDisabled}
                onClick={onUnselectSrv}
            >
                {_("Disable external storage")}
            </Button>
            <Button
                data-testid="use-drive-btn"
                className="btn-primary col-sm-12 col-md-4 col-lg-2"
                onClick={onUpdateSrv}
                disabled={buttonIsDisabled}
            >
                {_("Use drive")}
            </Button>
        </div>
    );
}
