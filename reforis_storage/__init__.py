#  Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from pathlib import Path

from flask import Blueprint, current_app, jsonify, request
from reforis.foris_controller_api.utils import validate_json

# pylint: disable=invalid-name
blueprint = Blueprint(
    'Storage',
    __name__,
    url_prefix='/storage/api',
)

BASE_DIR = Path(__file__).parent

# pylint: disable=invalid-name
storage = {
    'blueprint': blueprint,
    # Define {python_module_name}/js/app.min.js
    # See https://gitlab.labs.nic.cz/turris/reforis/reforis-distutils/blob/master/reforis_distutils/__init__.py#L11
    'js_app_path': 'reforis_storage/js/app.min.js',
    'translations_path': BASE_DIR / 'translations',
}


@blueprint.route('/state', methods=['GET'])
def state():
    return jsonify(current_app.backend.perform('storage', 'get_state'))


@blueprint.route('/settings', methods=['GET'])
def settings():
    return jsonify(current_app.backend.perform('storage', 'get_settings'))


@blueprint.route('/drives', methods=['GET'])
def drives():
    return jsonify(current_app.backend.perform('storage', 'get_drives'))


@blueprint.route('/prepare-srv', methods=['POST'])
def prepare_srv():
    data = request.json
    validate_json(data, {'drives': list, 'raid': str})
    return jsonify(current_app.backend.perform('storage', 'prepare_srv_drive', data))


@blueprint.route('/update-srv', methods=['POST'])
def update_srv():
    data = request.json
    validate_json(data, {'uuid': str})
    return jsonify(current_app.backend.perform('storage', 'update_srv', data))
