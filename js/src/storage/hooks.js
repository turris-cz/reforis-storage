/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useEffect, useState } from "react";
import update from "immutability-helper";

import {
    API_STATE, useAlert, useAPIGet, useWSForisModule,
} from "foris";
import API_URLs from "../API";
import { NOT_PENDING_STORAGE_STATES } from "./constants";

export default function useStorageState(ws, onStateChange) {
    const [setAlert] = useAlert();
    const [storageState, setStorageState] = useState({ state: API_STATE.INIT });

    const [storageStateGetStatus, storageStateGet] = useAPIGet(API_URLs.state);
    useEffect(() => {
        storageStateGet();
    }, [storageStateGet]);

    useEffect(() => {
        if ([API_STATE.INIT, API_STATE.SENDING].includes(storageStateGetStatus.state)) {
            return;
        }
        setStorageState(storageStateGetStatus);
        storageStateGet();
    }, [setAlert, storageStateGet, storageStateGetStatus]);

    const [storageStateWS] = useWSForisModule(ws, "storage", "state");
    useEffect(() => {
        if (storageStateWS && storageStateWS.current) {
            setStorageState((currentState) => update(
                currentState,
                { data: { state: { $set: storageStateWS.current } } },
            ));
            if (storageStateWS.current === NOT_PENDING_STORAGE_STATES.failed) {
                setAlert("Device preparing was failed. Check notifications for more info.");
            } else if (storageStateWS.current === NOT_PENDING_STORAGE_STATES.done) {
                storageStateGet();
            }
            onStateChange();
        }
    }, [setAlert, storageStateGet, storageStateWS]);

    return storageState;
}
