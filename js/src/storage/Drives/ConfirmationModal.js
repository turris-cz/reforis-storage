/*
 * Copyright (C) 2020-2024 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import React from "react";

import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from "foris";
import PropTypes from "prop-types";

ConfirmationModal.propTypes = {
    shown: PropTypes.bool.isRequired,
    setShown: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    isFirstDrive: PropTypes.bool.isRequired,
};

const FIRST_DRIVE_MESSAGE = _(`
You are adding the first drive, then you'll get notification and you will be asked to reboot. On the reboot data will be
moved from old drive to the new one. This can take some time so your next reboot will take longer. 
`);

export default function ConfirmationModal({
    shown,
    setShown,
    onConfirm,
    isFirstDrive,
}) {
    const firstDriveMessage = isFirstDrive ? FIRST_DRIVE_MESSAGE : "";
    return (
        <Modal shown={shown} setShown={setShown}>
            <ModalHeader setShown={setShown} title={_("Warning!")} />
            <ModalBody>
                <p>
                    {_(`
Are you sure you want to proceed? Newly selected drive(s) will be formatted and you will loose all the data on it.
${firstDriveMessage}
Are you sure you want to continue?
                    `)}
                </p>
            </ModalBody>
            <ModalFooter>
                <Button
                    className="btn-secondary"
                    onClick={() => setShown(false)}
                >
                    {_("Cancel")}
                </Button>
                <Button className="btn-primary" onClick={onConfirm}>
                    {_("Continue")}
                </Button>
            </ModalFooter>
        </Modal>
    );
}
