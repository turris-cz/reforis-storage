export default function state(blocked = false) {
    return {
        "blocked": blocked,
        "old_device_desc": "/dev/sdb",
        "old_uuid": "1234-1234-1234-1234-1234",
        "raid": "single",
        "state": blocked ? "formatting" : "none",
        "uuid": "1234-1234-1234-1234-1234",
    }
};
