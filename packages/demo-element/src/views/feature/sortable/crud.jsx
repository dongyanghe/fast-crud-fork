import * as api from "./api";
import { dict } from "@fast-crud/fast-crud";
export default function ({ expose }) {
  const editRequest = async ({ form, row }) => {
    form.id = row.id;
    return await api.UpdateObj(form);
  };
  const delRequest = async ({ row }) => {
    return await api.DelObj(row.id);
  };
  const addRequest = async ({ form }) => {
    return await api.AddObj(form);
  };

  return {
    crudOptions: {
      request: {
        pageRequest: api.GetList,
        addRequest,
        editRequest,
        delRequest
      },
      columns: {
        radio: {
          title: "本地排序",
          search: { show: true },
          type: "dict-radio",
          dict: dict({
            url: "/dicts/OpenStatusEnum?single"
          }),
          column: {
            sortable: true
          }
        },
        radio1: {
          title: "服务端排序1",
          search: { show: true },
          type: "dict-radio",
          dict: dict({
            url: "/dicts/OpenStatusEnum?single"
          }),
          column: {
            sortable: "custom"
          }
        },
        radio2: {
          title: "服务端排序2",
          search: { show: true },
          type: "dict-radio",
          dict: dict({
            url: "/dicts/OpenStatusEnum?single"
          }),
          column: {
            sortable: "custom"
          }
        }
      }
    }
  };
}
