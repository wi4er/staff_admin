import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle, Tab, Tabs,
} from '@mui/material';
import { Fields } from './Fields';
import { CommonFormProps } from '../CommonTable/CommonForm';
import { PropertyEdit } from '../PropertyEdit';
import { AuthContextValue, context as AuthContext } from '../../context/AuthContext';
import { UserProperty } from '../../model/UserProperty';
import { UserLang } from '../../model/UserLang';

interface UserFormProps extends CommonFormProps {
  id?: number | string;
  onClose: () => void;
}

interface UserFormState {
  tab: number;
  item: UserInput;
  properties: UserProperty[],
  lang: UserLang[],
}

export interface UserPermissionInput {
  group: number;
  method: string;
}

export interface UserInput {
  id: string;
  login: string;
  property: UserPropertyInput[];
  permission: UserPermissionInput[];
}

export interface UserPropertyInput {
  property: string;
  value: string;
  lang: string | null;
}

export class UserForm extends React.Component<UserFormProps, UserFormState> {
  static contextType = AuthContext;
  context!: AuthContextValue;

  state = {
    tab: 0,
    properties: [],
    lang: [],
    item: {
      id: '',
      login: '',
      property: [],
      permission: [ {
        group: 777,
        method: 'GET',
      } ],
    },
  } as UserFormState;

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
    {
      id: 'properties',
      title: 'Properties',
      component: () => (
        <PropertyEdit
          onChange={this.handleChangeProperty}
          item={this.state.item}
        />
      ),
    },
    {
      id: 'status',
      title: 'Status',
      component: () => (
        <div>
          Status
        </div>
      ),
    },
  ];

  componentDidMount() {
    const { id } = this.props;
    if (id) {
      this.context
        .getData('user', [ 'filter', `id-in-${id}` ])
        .then(user => {

        });
    }
  }

  handleChangeField = (field: string, value: string) => {
    this.setState(state => ({
      item: Object.assign(state.item, { [field]: value }),
    }));
  };

  handleChangeProperty = (propList: UserPropertyInput[]) => {
    this.setState(state => ({
      item: {
        ...state.item,
        property: propList,
      },
    }));
  };

  handleSave = () => {
    const { onClose } = this.props;
    const { item } = this.state;

    this.context
      .postData('user', item)
      .then(res => res.json()).then(res => {
      console.log(res);
    });
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
          {id ? `Update user #${id}` : 'Create user'}
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