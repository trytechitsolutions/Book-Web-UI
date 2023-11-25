import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import * as securedLocalStorage from '../../../services/secureLocalStorage';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import SnackbarView from '../../common/SnackBar';
import Loader from '../../common/Loader';
import { apiRequest } from '../../../services/api';

const defaultTheme = createTheme();
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '50%',
    margin: '0 auto',
    padding: defaultTheme.spacing(3),
  },
  textField: {
    marginBottom: defaultTheme.spacing(2),
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: defaultTheme.spacing(2),
  },
  button: {
    width: '48%',
  },
  formControl: {
    minWidth: '100%',
    marginBottom: defaultTheme.spacing(2),
  },

  componentContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: defaultTheme.spacing(2),
  },
  componentItem: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: defaultTheme.spacing(1),
  },
  checkboxContainer: {
    display: 'flex',
    alignItems: 'center',
    marginRight: defaultTheme.spacing(2),
  },
  subCheckboxContainer: {
    display: 'flex',
    alignItems: 'center',
  },
}));

const ComponentRoleMapping = () => {
  const classes = useStyles();
  const serverUrl = securedLocalStorage.baseUrl;
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [snackBarData, setSnackBarData] = useState();
  const [showLoader, setShowLoader] = useState(false);
  const [roleMapData, setRoleMapData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [components, setComponents] = useState([]);
  const [componentsDeepData, setComponentsDeepData] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');

  const getRoles = async () => {
    setShowLoader(true);
    const resp = await apiRequest({}, serverUrl + 'preference/role', 'get');
    if (resp?.status === 200 && resp?.data?.data) {
      setRoles(resp.data.data);
      if (resp.data.data.length > 0) {
        setSelectedRole(resp.data.data[0].id);
      }
    }
    setShowLoader(false);
  };
  const getComponents = async () => {
    setShowLoader(true);
    const resp = await apiRequest({}, serverUrl + 'preference/components', 'get');
    if (resp?.status === 200 && resp?.data?.data) {
      setComponents(resp.data.data);
      setComponentsDeepData(resp.data.data);

    }
    setShowLoader(false);
  };

  // useEffect(() => {
  //   getRoles();
  //   getComponents();
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getComponents();
        await getRoles();
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error if needed
      }
    };

    fetchData();
  }, []);
  useEffect(() => {
    if (selectedRole) {
      compRoleHandler(selectedRole);
    }
  }, [selectedRole]);

  const handleChange = (componentId, accessType) => {
    const updatedData = components.map((item) => {
      if (item.id === componentId) {
        if (accessType === 'read') {
          item.read = !item.read;
        }
        if (accessType === 'write') {
          item.write = !item.write;
        }
        if (accessType === 'edit') {
          item.edit = !item.edit;
        }
        if (accessType === 'delete') {
          item.delete = !item.delete;
        }
      }
      return item;
    });
    setRoleMapData(updatedData);
  };

  const compRoleHandler = async (id) => {
    setShowLoader(true);
    const resp = await apiRequest(null, serverUrl + `preference/maprole?role_id=${id}`, 'get');
    if (resp?.status === 200 && resp?.data?.data) {
      const roleMapData = resp.data.data;
      const updatedComponents = componentsDeepData.map((c) => {
        const filteredCompData = roleMapData.find((rm) => rm.component_id === c.id);
        if (filteredCompData) {
          if (c.id === filteredCompData.component_id) {
            return {
              ...c,
              read: filteredCompData.read,
              write: filteredCompData.write,
              edit: filteredCompData.edit,
              delete: filteredCompData.delete
            };
          }
        }
        return c;
      });
      setComponents([...updatedComponents]);
    }
    setShowLoader(false);
  }
  const handleRoleChange = async (event) => {
    setSelectedRole(event.target.value);
    await compRoleHandler(event.target.value);
  };
  const generateRoleMapPayload = (mapData) => {
    const list = [];
    mapData.map((m) => {
      list.push({ component_id: m.id, role_id: selectedRole, read: m.read || false, write: m.write || false, edit: m.edit || false, delete:m.delete || false })
    })
    return list;
  }
  const handleSubmit = async () => {
    setShowLoader(true);
    const resp = await apiRequest(generateRoleMapPayload(roleMapData), serverUrl + 'preference/maprole', 'post');
    setShowLoader(false);

    if (resp.data.data) {
      setOpenSnackBar(true);
      const data = {
        type: 'success',
        message: 'Component role mapping data saved successfully!....',
      };
      setSnackBarData(data);
    } else {
      setOpenSnackBar(true);
      const data = {
        type: 'error',
        message: resp.data.data.errorMsg,
      };
      setSnackBarData(data);
    }
  };

  const handleCancel = () => {
  };

  return (
    <>

      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <Select value={selectedRole} onChange={handleRoleChange} displayEmpty>
            {roles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={classes.componentContainer}>
          {components.map((item) => (
            <div key={item.id} className={classes.componentItem}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{item.title}:</Typography>
              <div style={{ display: "inline-flex" }}>
                <div className={classes.checkboxContainer}>
                  <Checkbox
                    checked={item?.read || false}
                    onChange={() => handleChange(item.id, 'read')}
                  />
                  <Typography variant="body2">Read</Typography>
                </div>
                <div className={classes.subCheckboxContainer}>
                  <Checkbox
                    checked={item?.write || false}
                    onChange={() => handleChange(item.id, 'write')}
                  />
                  <Typography variant="body2">Write</Typography>
                </div>
                <div className={classes.subCheckboxContainer}>
                  <Checkbox
                    checked={item?.edit || false}
                    onChange={() => handleChange(item.id, 'edit')}
                  />
                  <Typography variant="body2">Edit</Typography>
                </div>
                <div className={classes.subCheckboxContainer}>
                  <Checkbox
                    checked={item?.delete || false}
                    onChange={() => handleChange(item.id, 'delete')}
                  />
                  <Typography variant="body2">Delete</Typography>
                </div>
              </div>
            </div>
          ))}
        </div>


        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
          >
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCancel}
            className={classes.button}
          >
            Cancel
          </Button>
        </div>
        {openSnackBar && <SnackbarView data={snackBarData} closeSnakBar={() => setOpenSnackBar(false)} />}
        {showLoader && <Loader />}
      </div>
    </>
  );
};

export default ComponentRoleMapping;
