/*
 * Copyright (C) 2020 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import Storage from "./storage/Storage";
import "./storage/Storage.css";

const StoragePlugin = {
    name: _("Storage"),
    weight: 75,
    path: "/storage",
    icon: "hdd",
    component: Storage,
};

ForisPlugins.push(StoragePlugin);
