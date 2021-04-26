/*
 * Copyright (C) 2020-2021 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";
import PropTypes from "prop-types";

import { Button } from "foris";

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
        <div className="row justify-content-end ml-0 mr-0">
            <Button
                className="btn-primary col-sm-12 col-md-4 col-lg-2 mr-md-2 mb-2 mb-md-0"
                disabled={buttonIsDisabled}
                onClick={onUnselectSrv}
            >
                {_("Disable external storage")}
            </Button>
            <Button
                className="btn-primary col-sm-12 col-md-4 col-lg-2"
                onClick={onUpdateSrv}
                disabled={buttonIsDisabled}
            >
                {_("Use drive")}
            </Button>
        </div>
    );
}
