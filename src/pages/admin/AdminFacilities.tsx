import React, { useEffect, useMemo, useState } from "react";
import {
  Table,
  Input,
  Button,
  Modal,
  Form,
  Input as AntdInput,
  notification,
} from "antd";
import {
  useDeleteFacilityMutation,
  useGetFacilityQuery,
  useUpdateFacilityMutation,
} from "../../redux/features/facility/facilityApi";
import { TFacility } from "../../types";
import styles from "../../styles/CreateAdmin.module.css"; // reuse similar styles

const AdminFacilities: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [selectedFacility, setSelectedFacility] = useState<TFacility | null>(null);
  const [updateFacility] = useUpdateFacilityMutation();
  const [deleteFacility] = useDeleteFacilityMutation();
  const { data: facilitiesData = [], isLoading } = useGetFacilityQuery(undefined);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const filteredFacilities = useMemo(() => {
    const facilities = Array.isArray(facilitiesData.data) ? facilitiesData.data : [];
    return facilities.filter((facility: { name: string; location: string }) => {
      return (
        (facility.name?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
        (facility.location?.toLowerCase() || "").includes(searchText.toLowerCase())
      );
    });
  }, [facilitiesData, searchText]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleUpdate = (facility: TFacility) => {
    setSelectedFacility(facility);
  };

  const handleDelete = async (facilityId: string) => {
    try {
      await deleteFacility(facilityId).unwrap();
      notification.success({ message: "Facility deleted successfully" });
    } catch (error) {
      notification.error({ message: "Failed to delete facility" });
    }
  };

  const handleUpdateFacility = async (values: TFacility) => {
    try {
      if (!selectedFacility?._id) {
        throw new Error("Facility ID is missing");
      }

      const updateData = { ...values, _id: selectedFacility._id };
      console.log("Updating facility with data:", updateData);

      const res = await updateFacility(updateData).unwrap();
      console.log("Updated facility with data:", res);
      notification.success({ message: "Facility updated successfully" });
      setSelectedFacility(null);
    } catch (error) {
      notification.error({ message: "Failed to update facility" });
      console.log("Update error:", error);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Location", dataIndex: "location", key: "location" },
    { title: "Price/Hour", dataIndex: "pricePerHour", key: "pricePerHour" },
    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: TFacility) => (
        <>
          <Button
            onClick={() => handleUpdate(record)}
            type="primary"
            style={{ border: "transparent", margin: '0.5vh 0.5vw' }}
          >
            Update
          </Button>
          <Button
            onClick={() => handleDelete(record._id)}
            type="default"
            style={{ backgroundColor: "red", border: "transparent", margin: '0.5vh 0.5vw' }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1 className={styles.textSpecial2}>All Facilities</h1>
      <Input
        placeholder="Search by name or location"
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: isMobile ? "45%" : "25%" }}
      />
      <Table
        dataSource={filteredFacilities}
        columns={columns}
        rowKey="_id"
        loading={isLoading}
      />
      {selectedFacility && (
        <Modal
          title="Update Facility"
          open={!!selectedFacility}
          onCancel={() => setSelectedFacility(null)}
          footer={null}
        >
          <Form initialValues={selectedFacility} onFinish={handleUpdateFacility}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input the facility name!" }]}
            >
              <AntdInput />
            </Form.Item>

            <Form.Item
              name="image"
              label="Banner"
              rules={[{ required: true, message: "Please input the facility banner!" }]}
            >
              <AntdInput />
            </Form.Item>

            <Form.Item
              name="location"
              label="Location"
              rules={[{ required: true, message: "Please input the location!" }]}
            >
              <AntdInput />
            </Form.Item>

            <Form.Item
              name="pricePerHour"
              label="pricePerHour"
              rules={[{ required: true, message: "Please input the pricePerHour!" }]}
            >
              <AntdInput />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Update
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      )}
    </div>
  );
};

export default AdminFacilities;
