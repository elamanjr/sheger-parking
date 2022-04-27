import Button from '../Button';
import { Link } from 'react-router-dom';

export function ShowAdmins({ adminList }) {
  return (
    <div className=''>
        <h1 className='pb-2'>List Of Admins</h1>
      <table className="table table-striped">
        <tbody className="">
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Password</th>
            <th>
              <Link to="new">
                <Button
                  color=""
                  bgColor="var(--primary-color)"
                  name="Add Admin"
                  id="addAdminBtn"
                  className="btn px-4"
                />
              </Link>
            </th>
          </tr>
        </tbody>
        <tbody id="tableDataField">
          {adminList.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.fullName}</td>
                <td>{item.phone}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                  <Link to="edit">
                    <Button
                      color=""
                      bgColor=""
                      name="Edit"
                      id={item.id}
                      className="btn editBtn"
                    />
                  </Link>

                  <Link to="delete">
                    <Button
                      color=""
                      bgColor=""
                      name="Delete"
                      id={item.id}
                      className="btn deleteButton ms-1"
                    />
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function NewAdmin() {
  return (
    <form className="form" id="add-admin-form" action="" method="post">
      <h1 id="formHeader">New Admin</h1>
      <div className="form-group">
        <label for="fullName">Full Name:</label>
        <input
          type="text"
          className="form-control "
          id="fullName"
          placeholder="Full Name"
          name="fullName"
          required
          oninvalid="input_error('fullName')"
        />
        <div id="fullNameError" className="errorOutput"></div>
      </div>
      <div className="form-group">
        <label for="phone">Phone:</label>
        <input
          type="tell"
          className="form-control tell"
          id="phone"
          placeholder="Phone"
          name="phone"
          required
          oninvalid="input_error('phone')"
        />
        <div id="phoneError" className="errorOutput"></div>
      </div>
      <div className="form-group">
        <label for="email">Email:</label>
        <input
          type="email"
          className="form-control email"
          id="email"
          placeholder="Email : example@email.com"
          name="email"
          required
          oninvalid="input_error('email')"
        />
        <div id="emailError" className="errorOutput"></div>
      </div>

      <div className="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          className="form-control password"
          id="password"
          placeholder="Password"
          name="password"
          required
          oninvalid="input_error('password')"
        />
        <div id="passwordError" className="errorOutput"></div>
      </div>
      <div className="form-group">
        <label for="confirmPassword" id="confirmPsdd">
          Confirm Password:
        </label>
        <input
          type="password"
          className="form-control password"
          id="confirmPassword"
          placeholder="Confirm Password"
          name="confirmPassword"
          required
          oninvalid="input_error('confirmPassword')"
        />
        <div id="confirmPasswordError" className="errorOutput"></div>
      </div>
      <div id="errorDisplay"></div>
      <br />
      <button
        className="btn btn-customized buttonWider"
        id="addBtn"
        onSubmit="displayOverviewPage()"
      >
        Add
      </button>
    </form>
  );
}

export function DeleteAdmin() {
  return <div>Admin Deleted</div>;
}

export function EditAdmin() {
    return (
        <form className="form" id="add-admin-form" action="" method="post">
          <h1 id="formHeader">Edit Admin</h1>
          <div className="form-group">
            <label for="fullName">Full Name:</label>
            <input
              type="text"
              className="form-control "
              id="fullName"
              placeholder="Full Name"
              name="fullName"
              required
              oninvalid="input_error('fullName')"
              
            />
            <div id="fullNameError" className="errorOutput"></div>
          </div>
          <div className="form-group">
            <label for="phone">Phone:</label>
            <input
              type="tell"
              className="form-control tell"
              id="phone"
              placeholder="Phone"
              name="phone"
              required
              oninvalid="input_error('phone')"
            />
            <div id="phoneError" className="errorOutput"></div>
          </div>
          <div className="form-group">
            <label for="email">Email:</label>
            <input
              type="email"
              className="form-control email"
              id="email"
              placeholder="Email : example@email.com"
              name="email"
              required
              oninvalid="input_error('email')"
            />
            <div id="emailError" className="errorOutput"></div>
          </div>
    
          <div className="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              className="form-control password"
              id="password"
              placeholder="Password"
              name="password"
              required
              oninvalid="input_error('password')"
            />
            <div id="passwordError" className="errorOutput"></div>
          </div>
          <div className="form-group">
            <label for="confirmPassword" id="confirmPsdd">
              Confirm Password:
            </label>
            <input
              type="password"
              className="form-control password"
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              required
              oninvalid="input_error('confirmPassword')"
            />
            <div id="confirmPasswordError" className="errorOutput"></div>
          </div>
          <div id="errorDisplay"></div>
          <br />
          <button
            className="btn btn-customized buttonWider"
            id="addBtn"
            onSubmit="displayOverviewPage()"
          >
            Add
          </button>
        </form>
      );}
