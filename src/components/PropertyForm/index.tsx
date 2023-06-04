import React from 'react';
import { UserProperty } from '../../model/UserProperty';
import { UserLang } from '../../model/UserLang';
import { Fields } from './Fields';
import { Box, Button, Dialog, DialogActions, DialogTitle, Tab, Tabs } from '@mui/material';
import { CommonFormProps } from '../CommonTable/CommonForm';
import { PropertyInput } from '../../model/PropertyInput';
import { AuthContextValue, context as AuthContext } from '../../context/AuthContext';

interface PropertyFormState {
  tab: number;
  properties: UserProperty[];
  lang: UserLang[];
  item: PropertyInput;
}

interface PropertyFormProps extends CommonFormProps {
  onClose: () => void;
  id?: string | number;
}

export class PropertyForm extends React.Component<PropertyFormProps, PropertyFormState> {
  static contextType = AuthContext;
  context!: AuthContextValue;

  state = {
    tab: 0,
    properties: [],
    lang: [],
    item: {
      id: '',
      type: 'STRING',
    },
  } as PropertyFormState;

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

  constructor(props: PropertyFormProps) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props;

    if (id) {
      this.context
        .getData('property', [ `filter=id-eq-${id}` ])
        .then(res => res.json())
        .then(res => {
          this.setState({
            item: {
              id: res[0].id,
              type: res[0].type,
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
      this.context.putData('property', id.toString(), item)
        .then(res => {
          if (res.ok) onClose();
        });
    } else {
      this.context.postData('property', item)
        .then(res => {
          if (res.ok) onClose();
        });
    }
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
          {id ? `Update property %${id}` : 'Create property'}
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
          <Button onClick={this.handleSave}>{id ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    );
  }
}