/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
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
    storageIsPending: PropTypes.bool.isRequired,
};

export default function UUIDsActionButtons({ onUnselectSrv, onUpdateSrv, storageIsPending }) {
    return (
        <>
            <Button
                className="btn-primary offset-lg-1 col-lg-4 col-sm-12"
                disabled={storageIsPending}
                onClick={onUnselectSrv}
            >
                {_("Unset UUID")}
            </Button>
            <Button
                className="btn-primary col-sm-12 col-lg-4 offset-lg-2 col-lg-3"
                disabled={storageIsPending}
                onClick={onUpdateSrv}
            >
                {_("Set UUID")}
            </Button>
        </>
    );
}
