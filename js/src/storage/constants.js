/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

const NOT_PENDING_STORAGE_STATES = {
    none: "none",
    done: "done",
    failed: "failed",
};

const PENDING_STORAGE_STATES = {
    formatting: _("Formatting"),
    growing: _("Growing"),
    shrinking: _("Shrinking"),
    balancing: _("Balancing"),
};

const STORAGE_STATES = {
    ...NOT_PENDING_STORAGE_STATES,
    ...PENDING_STORAGE_STATES,
};

export { NOT_PENDING_STORAGE_STATES, PENDING_STORAGE_STATES, STORAGE_STATES };
