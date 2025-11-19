// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import Modal from 'react-bootstrap/Modal';
// import axiosInstance from '../axios/AxiosInstance';
// import type { UserEdit, UserState } from '../shared/types';

// type ProfileProps = {
//   setUser: React.Dispatch<React.SetStateAction<UserState>>;
//   user: UserEdit;
// };

// export default function Modaledit({ showEdit, setShowEdit, setUser, user, }: ProfileProps) {

//   // ======================можно управлять===============================
//   // const handleEdit = (e) => {
//   //   const { name, value } = e.target;
//   //   setSelectedCompany({ ...company, [name]: value });
//   // };
//   // // =====================================================

//   const handleSubmit = async (e: { target: HTMLFormElement | undefined; }) => {
//     // e.preventDefault();
//     const data = Object.fromEntries(new FormData(e.target));
//     try {
//       const response = await axiosInstance.put(`/users/${user.id}`, data);
//       if (response.status === 200) {
//         setUser(response);
//         setShowEdit(false);
//       }
//     } catch (error) {
//       console.error(error);
//       alert(error.response?.data?.message || 'Ошибка при сохранении');
//     }
//   };
//   return (
//     <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
    

//       <Modal.Body>
//         <Form onSubmit={handleSubmit}>
//           <Form.Group className="mb-3">
//             <Form.Label>Название</Form.Label>
//             <Form.Control
//               type="text"
//               name="fullName"
//               placeholder="Введите название"
//               defaultValue={user?.fullName}
//               // используем дефолтное значение если инпут неуправляемый
//               // onChange={handleEdit}
//               required
//             />
//           </Form.Group>

//           <Form.Group className="mb-3">
//             <Form.Label>Описание</Form.Label>
//             <Form.Control
//               type="email"
//               name="email"
//               defaultValue={user?.email}
//               // onChange={handleEdit}
//             />
//           </Form.Group>

//             <Form.Group className="mb-3">
//             <Form.Label>Описание</Form.Label>
//             <Form.Control
//               type="phone"
//               name="phone"
//               defaultValue={articles?.phone}
//               // onChange={handleEdit}
//             />
//           </Form.Group>

//           <Button variant="primary" type="submit">
//             Сохранить изменения
//           </Button>
//         </Form>
//       </Modal.Body>
//     </Modal>
//   );
// }
