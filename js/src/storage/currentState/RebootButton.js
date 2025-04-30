/*
 * Copyright (C) 2025 CZ.NIC z.s.p.o. (https://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { ActionButtonWithModal, Button, ForisURLs } from "foris";
import PropTypes from "prop-types";

RebootButton.propTypes = {
    className: PropTypes.string,
};

export default function RebootButton({ className }) {
    const actionTriggerBtn = (props) => (
        <Button className={className || ""} {...props}>
            {_("Reboot")}
        </Button>
    );

    return (
        <ActionButtonWithModal
            actionTrigger={actionTriggerBtn}
            actionUrl={ForisURLs.reboot}
            modalTitle={_("Warning!")}
            modalMessage={_("Are you sure you want to reboot the router?")}
            modalActionText={_("Reboot")}
            modalActionProps={{ className: "btn-danger" }}
            successMessage={_("The router has been rebooted successfully.")}
            errorMessage={_("An error occurred while rebooting the router.")}
        />
    );
}
