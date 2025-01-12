
import { useEffect, useState } from 'react'
import AdminDasboardLayout from '../../components/layout/AdminDasboardLayout'
import { CategoryInterface } from '../../../interfaces/ProductInterface';
import { useCategory } from '../../../hooks/useCategory';
import { toast } from 'react-toastify';
import { errorHandler } from '../../../utils/errorHandler';
import { Bounce } from 'react-activity';
import { IoMdArrowRoundBack } from 'react-icons/io';


export default function AdminCategories() {

  const [idToEdit, setIdToEdit] = useState("");
  const [tabValue, setTabvalue] = useState("list");

  const [allCategories, setAllCategories] = useState<CategoryInterface[]>([]);

  const [categoryName, setCategoryName] = useState("");
  
    const { getAllCategories, addNewCategory, deleteCategory, isAddCategoryLoading, isCategoriesLoading, isUpdateCategoryLoading, updateCategory } = useCategory();

    const fetchCategories = async () => {
        const response = await getAllCategories();
    
        console.log(response.data.result);
        setAllCategories(response.data.result);
      };
    
      useEffect(() => {
        fetchCategories();
      }, []);
    
      const addOrEditCategory = async () => {
        if(idToEdit) {
          const response = await updateCategory(categoryName, idToEdit);
          if(response.data.status == 200) {
            toast.success("Category updated successfully");
            setCategoryName("");
            setTabvalue("list");
            fetchCategories();
          } else {
            console.log(response);
            toast.error(errorHandler(response.error));
          }
        } else {
          const response = await addNewCategory(categoryName);
          if(response.data.status == 201) {
            toast.success("New category added successfully");
            setCategoryName("");
            setTabvalue("list");
            fetchCategories();
          } else {
            toast.error(errorHandler(response.error));
          }
        }
      }

      const deleteCategoryButton = async (categoryId: string) => {
        const response = await deleteCategory(categoryId);

        if(response.data.status == 200) {
          toast.success("Category deleted successfully");
          fetchCategories();
        } else {
          toast.error(errorHandler(response.error));
        }

      }

  return (
    <AdminDasboardLayout header={tabValue == "list" ? "Categories" : (idToEdit ? "Update Category" : "Add Category")} showSearch={false}>
      <div>
          {
            tabValue == "list" && (
              <div className='text-right my-4'>
            <button className='bg-primary py-2 px-4 rounded-md text-white font-medium' onClick={() => {
              setTabvalue("form");
              setIdToEdit("");
              setCategoryName("");
            }}>
              Add new category
            </button>
              </div>
            )
          }
          
          {
            tabValue == "form" && (
              <div className='my-4'>
                <button onClick={() => {
                  setTabvalue("list");
                  setIdToEdit("");
                  setCategoryName("");
                  }} className='flex gap-2 items-center'><IoMdArrowRoundBack /> Back</button>
              </div>
            )
          }

        {
          isCategoriesLoading && <Bounce />
        }
        {
          tabValue == "list" && (
            <div>{
              allCategories.length == 0 ? (
                <div>
                  <div className='font-bold text-[25px]'>
                    No Category Added
                  </div>
                </div>
              ) : (
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
                  {
                    allCategories.map(c => (
                      <div className='text-center p-4 border border-2 border-solid border-[rgba(0,0,0,0.2)] rounded-xl flex flex-col justify-between'>
                        <div className='font-medium text-[20px]'>{c.name}</div>
                        <div className='flex gap-2 mt-4'>
                          <button className='rounded-md text-primary font-medium w-1/2' onClick={() => {
                            setIdToEdit(c._id);
                            setCategoryName(c.name);
                            setTabvalue("form");
                          }}>Edit</button>
                          <button className='rounded-md text-[red] font-medium w-1/2' onClick={() => {deleteCategoryButton(c._id)}}>Delete</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              )
            }</div>
          )
        }

        {
          tabValue == "form" && (
            <div className='w-full h-[60vh] flex justify-center items-center'>
              <div>
                <div className='mb-2'>
                  <div className=' mb-2 text-center font-bold text-[20px]'>{idToEdit ? "Update" : "Create new"} category</div>
                <input value={categoryName} onChange={(e) => {setCategoryName(e.target.value)}} placeholder='Enter a category name' className='py-1 px-2 border border-2 border-primary rounded-md' />
                </div>
                <button onClick={addOrEditCategory} className='bg-primary text-white px-4 py-1 rounded-md w-full font-medium'>{isAddCategoryLoading || isUpdateCategoryLoading ? (<Bounce />) : (idToEdit ? "Update" : "Create")} Category</button>
              </div>
            </div>
          )
        }
        
      </div>
    </AdminDasboardLayout>
  )
}
