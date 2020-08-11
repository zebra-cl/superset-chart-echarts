from importlib.util import spec_from_loader, module_from_spec

from superset.viz import viz_types, TableViz


class EchartsViz(TableViz):
    """Echarts"""

    viz_type = "echarts"
    verbose_name = "Echarts"
    is_timeseries = True

    def get_data(self, df):
        if df.empty:
            return None

        get_opts = self.get_opts_func()

        return get_opts(df)

    def get_opts_func(self):
        fd = self.form_data
        code = fd.get('code')

        tmp_name = 'tmp_module'
        tmp_spec = spec_from_loader(tmp_name, loader=None)
        tmp_module = module_from_spec(tmp_spec)
        exec(code, tmp_module.__dict__)

        return tmp_module.get_opts


viz_types['echarts'] = EchartsViz
