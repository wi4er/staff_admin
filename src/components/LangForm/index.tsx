import React from 'react';
import { UserProperty } from '../../model/UserProperty';
import { UserLang } from '../../model/UserLang';
import { Fields } from './Fields';
import { Box, Button, Dialog, DialogActions, DialogTitle, Tab, Tabs } from '@mui/material';
import { AuthContextValue, context as AuthContext } from '../../context/AuthContext';

export interface LangInput {
  id: string;
}

interface LangFormState {
  tab: number;
  properties: UserProperty[];
  lang: UserLang[];
  item: LangInput;
}


export class LangForm extends React.Component<any, LangFormState> {
  static contextType = AuthContext;
  context!: AuthContextValue;

  state = {
    tab: 0,
    properties: [] as UserProperty[],
    lang: [] as UserLang[],
    item: {
      id: '',
      type: '0,'
    },
  };

  tabs = [
    {
      id: 'fields',
      title: 'Fields',
      component: () => (
        <Fields
          onChange={this.handleChangeField}
          item={this.state.item}
        />
      ),
    },
  ];

  componentDidMount() {
    const { id } = this.props;

    if (id) {
      this.context
        .getData('lang', [ `filter=id-eq-${id}` ])
        .then(res => res.json())
        .then(res => {
          this.setState({
            item: {
              id: res[0].id,
            },
          });
        });
    }
  }

  handleChangeField = (field: string, value: string) => {
    this.setState(state => ({
      item: Object.assign(state.item, { [field]: value }),
    }));
  };

  handleSave = () => {
    const { onClose, id } = this.props;
    const { item } = this.state;

    if (id) {
      this.context.putData('lang', id.toString(), item)
        .then(res => { if (res.ok) onClose(); });
    } else {
      this.context.postData('lang', item)
        .then(res => { if (res.ok) onClose(); });
    }

    // onClose();
  };

  renderTab() {
    const { tab } = this.state;

    return this.tabs[tab].component();
  }

  render() {
    const { onClose, id } = this.props;
    const { tab } = this.state;

    return (
      <Dialog open={true} onClose={onClose}>
        <DialogTitle>
          {id ? `Update language %${id}` : 'Create language'}
        </DialogTitle>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={(event, value) => this.setState({ tab: value })}
            aria-label="basic tabs example"
          >
            {this.tabs.map(item => (
              <Tab
                label={item.title}
                key={item.id}
                id={item.id}
                aria-controls={`tab-panel-${item.id}`}
              />
            ))}
          </Tabs>
        </Box>

        {this.renderTab()}

        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={this.handleSave}>Create</Button>
        </DialogActions>
      </Dialog>
    );
  }
}