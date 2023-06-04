import React from 'react';
import { Box, DialogContent, List, ListSubheader, TextField } from '@mui/material';
import { UserProperty } from '../../model/UserProperty';
import { UserLang } from '../../model/UserLang';
import { UserInput, UserPropertyInput } from '../UserForm';
import { AuthContextValue, context as AuthContext } from '../../context/AuthContext';

interface PropertyEditProps {
  onChange: (list: UserPropertyInput[]) => void;
  item: UserInput;
}

interface PropertyEditState {
  propertyList: UserProperty[];
  langList: UserLang[];
}

type PropMap = { [property: string]: { [lang: string]: string } };

export class PropertyEdit extends React.Component<PropertyEditProps, PropertyEditState> {
  static contextType = AuthContext;
  context!: AuthContextValue;

  state = {
    propertyList: [],
    langList: [],
  } as PropertyEditState;

  componentDidMount() {
    this.context
      .getData('property')
      .then(res => {
        if (res.ok) {
          res.json().then((res: Array<UserProperty>) => this.setState({ propertyList: res }));
        }
      });

    this.context
      .getData('lang')
      .then(res => {
        if (res.ok) {
          res.json().then((res: Array<UserLang>) => this.setState({ langList: res }));
        }
      });
  }

  handleChangeProperty = (property: string, lang: string | null, value: string) => {
    const propList: UserPropertyInput[] = [ ...this.props.item.property ];

    for (const key in propList) {
      if (
        propList[key].property === property
        && propList[key].lang === lang
      ) {
        propList[key] = { property, lang, value };

        return this.props.onChange(propList);
      }
    }

    propList.push({ property, lang, value });

    return this.props.onChange(propList);
  };

  render() {
    const { item } = this.props;
    const { propertyList, langList } = this.state;
    const values: PropMap = {};

    for (const prop of item.property) {
      if (!values[prop.property]) values[prop.property] = {};

      values[prop.property][prop.lang ?? ''] = prop.value;
    }

    return (
      <DialogContent>
        {propertyList.map(propItem => (
          <List key={propItem.id}>
            <ListSubheader>
              {propItem.id}
            </ListSubheader>

            <Box>
              <TextField
                fullWidth
                margin="none"
                label="no lang"
                type="input"
                name={''}
                variant="standard"
                value={values[propItem.id]?.[''] ?? ''}
                onChange={event => this.handleChangeProperty(propItem.id, null, event.target.value)}
              />

              {langList.map(langItem => (
                <TextField
                  key={langItem.id}
                  fullWidth
                  margin="dense"
                  id="id"
                  label={langItem.id}
                  type="input"
                  variant="standard"
                  value={values[propItem.id]?.[langItem.id] ?? ''}
                  onChange={event => this.handleChangeProperty(propItem.id, langItem.id, event.target.value)}
                />
              ))}
            </Box>
          </List>
        ))}
      </DialogContent>
    );
  }
}