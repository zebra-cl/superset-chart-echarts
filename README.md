用于在superset中使用echarts

## 安装
#### 在前端注册插件
1. 将`superset-chart-echarts`文件夹复制到`../assets/src/visualizations`。
2. 在`../assets/src/visualizations/presets/MainPreset.js`中注册插件：
    ```js
    import EchartsChartPlugin from '../superset-chart-echarts/EchartsChartPlugin';

    new EchartsChartPlugin()
    .configure({ key: 'echarts' })
    .register();
    ```
3. 在`../assets/src/explore/controls.jsx`中定义`control`：
    ```js
    code: {
        type: 'TextAreaControl',
        label: t('Code'),
        default: 'def get_opts(df):\n    return df.T.to_dict()',
    }
    ```
4. 安装依赖
    ```shell
    npm install -d
    npm install echarts-for-react
    npm install echarts
    npm install echarts-gl
    ```
5. 重新生成前端文件
    ```shell
    npm run build
    ```
#### 在后台注册插件
```python
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
```

## 使用
在`Code`中以字典的形式返回Echarts的配置项即可，如图：  
![image](/img/screenshot1.jpg)
