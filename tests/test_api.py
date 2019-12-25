#  Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
#
#  This is free software, licensed under the GNU General Public License v3.
#  See /LICENSE for more information.

from http import HTTPStatus
import pytest

from reforis.test_utils import _test_api_endpoint_foris_controller_call, mock_backend_response


@pytest.mark.parametrize(
    'endpoint, module, action', [
        ('state', 'storage', 'get_state'),
        ('settings', 'storage', 'get_settings'),
        ('drives', 'storage', 'get_drives'),
    ]
)
def test_api_get_endpoint_foris_controller_calls(client, endpoint, module, action):
    _test_api_endpoint_foris_controller_call(client, f'storage/api/{endpoint}', 'get', module, action)


@pytest.mark.parametrize(
    'endpoint, module, action, request_data, response_data', [
        ('prepare-srv', 'storage', 'prepare_srv_drive', {'drives': [], 'raid': ''}, {'result': True}),
        ('update-srv', 'storage', 'update_srv', {'uuid': ''}, {'result': True}),
    ]
)
def test_api_post_endpoint_foris_controller_calls(client, endpoint, module, action, request_data, response_data):
    _test_api_endpoint_foris_controller_call(
        client,
        f'storage/api/{endpoint}', 'post',
        module, action,
        request_data=request_data,
        response_data=response_data,
    )


@pytest.mark.parametrize(
    'data, message', [
        ({}, "Invalid JSON"),
        ({'drives': '', 'raid': ''}, {'drives': 'Expected data of type: list'}),
        ({'drives': [], 'raid': []}, {'raid': 'Expected data of type: str'}),
    ]
)
def test_prepare_srv_post_invalid_data(client, data, message):
    response = client.post('/storage/api/prepare-srv', json=data)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == message


@mock_backend_response({'storage': {'prepare_srv_drive': {'result': True}}})
def test_prepare_srv_post_valid_data(client):
    response = client.post('/storage/api/prepare-srv', json={'drives': [], 'raid': ''})
    assert response.status_code == HTTPStatus.OK


@mock_backend_response({'storage': {'prepare_srv_drive': {'result': False}}})
def test_prepare_srv_post_fail(client):
    response = client.post('/storage/api/prepare-srv', json={'drives': [], 'raid': ''})
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR


@pytest.mark.parametrize(
    'data, message', [
        ({}, "Invalid JSON"),
        ({'uuid': []}, {'uuid': 'Expected data of type: str'}),
    ]
)
def test_update_srv_post_invalid_data(client, data, message):
    response = client.post('/storage/api/update-srv', json=data)
    assert response.status_code == HTTPStatus.BAD_REQUEST
    assert response.json == message


@mock_backend_response({'storage': {'update_srv': {'result': True}}})
def test_update_srv_post_valid_data(client):
    response = client.post('/storage/api/update-srv', json={'uuid': ''})
    assert response.status_code == HTTPStatus.OK


@mock_backend_response({'storage': {'update_srv': {'result': False}}})
def test_update_srv_post_fail(client):
    response = client.post('/storage/api/update-srv', json={'uuid': ''})
    assert response.status_code == HTTPStatus.INTERNAL_SERVER_ERROR
