import React from 'react';
import { CONSTANTS } from 'amphion';
import LaserScanOptions from './laserScan';
import MapOptions from './map';
import MarkerOptions from './marker';
import OdometryOptions from './odometry';
import PathOptions from './path';
import PoseOptions from './pose';
import PointCloudOptions from './pointcloud';
import RangeOptions from './range';
import PointOptions from './point';
import InteractiveMarkerOptions from './interactiveMarkerOptions';
import WrenchOptions from './wrench';
import RobotModelLinksJoints from './robotModel';

const {
  VIZ_TYPE_IMAGE,
  VIZ_TYPE_IMAGE2,
  VIZ_TYPE_INTERACTIVEMARKER,
  VIZ_TYPE_INTERACTIVEMARKER2,
  VIZ_TYPE_LASERSCAN,
  VIZ_TYPE_LASERSCAN2,
  VIZ_TYPE_MAP,
  VIZ_TYPE_MAP2,
  VIZ_TYPE_MARKER,
  VIZ_TYPE_MARKER2,
  VIZ_TYPE_MARKERARRAY,
  VIZ_TYPE_MARKERARRAY2,
  VIZ_TYPE_ODOMETRY,
  VIZ_TYPE_ODOMETRY2,
  VIZ_TYPE_PATH,
  VIZ_TYPE_PATH2,
  VIZ_TYPE_POINT,
  VIZ_TYPE_POINT2,
  VIZ_TYPE_POINTCLOUD,
  VIZ_TYPE_ROS2POINTCLOUD,
  VIZ_TYPE_POLYGON,
  VIZ_TYPE_POSE,
  VIZ_TYPE_POSE2,
  VIZ_TYPE_POSEARRAY,
  VIZ_TYPE_POSEARRAY2,
  VIZ_TYPE_RANGE,
  VIZ_TYPE_RANGE2,
  VIZ_TYPE_ROBOTMODEL,
  VIZ_TYPE_TF,
  VIZ_TYPE_ROS2_TF,
  VIZ_TYPE_WRENCH,
  VIZ_TYPE_WRENCH2,
} = CONSTANTS;

const VizSpecificOptions = ({
  options: { vizType },
  options,
  topics,
  vizInstance,
  relatedTopics,
  updateVizOptions,
}) => {
  switch (vizType) {
    case VIZ_TYPE_IMAGE:
      return null;
    case VIZ_TYPE_IMAGE2:
      return null;
    case VIZ_TYPE_INTERACTIVEMARKER:
      return (
        <InteractiveMarkerOptions
          options={options}
          topics={topics}
          relatedTopics={relatedTopics}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_INTERACTIVEMARKER2:
      return (
        <InteractiveMarkerOptions
          options={options}
          topics={topics}
          relatedTopics={relatedTopics}
          updateVizOptions={updateVizOptions}
        />
    );
    case VIZ_TYPE_LASERSCAN:
      return (
        <LaserScanOptions
          options={options}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_LASERSCAN2:
      return (
        <LaserScanOptions
          options={options}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_MAP:
      return (
        <MapOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_MAP2:
      return (
        <MapOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_MARKER:
      return (
        <MarkerOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_MARKER2:
      return (
        <MarkerOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_MARKERARRAY:
      return null;
    case VIZ_TYPE_MARKERARRAY2:
      return null;
    case VIZ_TYPE_ODOMETRY:
      return (
        <OdometryOptions
          options={options}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_ODOMETRY2:
      return (
        <OdometryOptions
          options={options}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_PATH:
      return (
        <PathOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_PATH2:
      return (
        <PathOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_POINT:
      return (
        <PointOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_POINT2:
      return (
        <PointOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_POINTCLOUD:
      return (
        <PointCloudOptions
          options={options}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_ROS2POINTCLOUD:
      return (
        <PointCloudOptions
          options={options}
          updateVizOptions={updateVizOptions}
        />
      );
    case VIZ_TYPE_POLYGON:
      return null;
    case VIZ_TYPE_POSE:
      return (
        <PoseOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_POSE2:
      return (
        <PoseOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_POSEARRAY:
      return null;
    case VIZ_TYPE_POSEARRAY2:
      return null;
    case VIZ_TYPE_RANGE:
      return (
        <RangeOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_RANGE2:
      return (
        <RangeOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_ROBOTMODEL:
      return <RobotModelLinksJoints vizInstance={vizInstance} />;
    case VIZ_TYPE_TF:
      return null;
    case VIZ_TYPE_ROS2_TF:
      return null;
    case VIZ_TYPE_WRENCH:
      return (
        <WrenchOptions options={options} updateVizOptions={updateVizOptions} />
      );
    case VIZ_TYPE_WRENCH2:
      return (
        <WrenchOptions options={options} updateVizOptions={updateVizOptions} />
      );
    default:
      return null;
  }
};

export default VizSpecificOptions;
