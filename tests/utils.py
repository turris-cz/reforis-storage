from reforis.test_utils import get_mocked_client

def get_mocked_storage_client(*args, **kwargs):
    return get_mocked_client('reforis_storage', *args, *kwargs)
