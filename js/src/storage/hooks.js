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

/**
 * The useStorageState hook gets initial storage state and keeps it updated via WebSockets.
 * It uses `state` action of `storage` module of foris-controller.
 */
export default function useStorageState(ws, onStateChange) {
    const [setAlert] = useAlert();
    const [storageState, setStorageState] = useState({ state: API_STATE.INIT });

    const [getStorageStateResponse, getStorageState] = useAPIGet(API_URLs.state);
    useEffect(() => {
        getStorageState();
    }, [getStorageState]);

    useEffect(() => {
        if ([API_STATE.SUCCESS, API_STATE.ERROR].includes(getStorageStateResponse.state)) {
            setStorageState(getStorageStateResponse);
        }
    }, [setAlert, getStorageState, getStorageStateResponse]);

    const [storageStateWS] = useWSForisModule(ws, "storage", "state");
    useEffect(() => {
        if (storageStateWS && storageStateWS.current) {
            setStorageState((currentState) => update(
                currentState,
                { data: { state: { $set: storageStateWS.current } } },
            ));
            if (storageStateWS.current === NOT_PENDING_STORAGE_STATES.failed) {
                setAlert("Device preparation failed. Check notifications for more information.");
            } else if (storageStateWS.current === NOT_PENDING_STORAGE_STATES.done) {
                getStorageState();
            }
            onStateChange();
        }
    }, [onStateChange, setAlert, getStorageState, storageStateWS]);

    return [storageState, getStorageState];
}
