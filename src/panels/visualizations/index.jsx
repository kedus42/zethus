import React from 'react';
import { Rnd } from 'react-rnd';
import Amphion from 'amphion';

import _, { map } from 'lodash';
import { getTfTopics } from '../../utils';
import { getROS2TfTopics } from '../../utils';
import { VizImageContainer, VizImageHeader } from '../../components/styled/viz';
import {
  VIZ_TYPE_DEPTHCLOUD_STREAM,
  VIZ_TYPE_IMAGE_STREAM,
} from '../../utils/vizOptions';
import { getOrCreateRosTopicDataSource } from '../sources';

const {
  MESSAGE_TYPE_IMAGE,
  MESSAGE_TYPE_IMAGE2,
  MESSAGE_TYPE_LASERSCAN,
  MESSAGE_TYPE_LASERSCAN2,
  MESSAGE_TYPE_MARKER,
  MESSAGE_TYPE_MARKER2,
  MESSAGE_TYPE_MARKERARRAY,
  MESSAGE_TYPE_MARKERARRAY2,
  MESSAGE_TYPE_OCCUPANCYGRID,
  MESSAGE_TYPE_OCCUPANCYGRID2,
  MESSAGE_TYPE_ODOMETRY,
  MESSAGE_TYPE_ODOMETRY2,
  MESSAGE_TYPE_PATH,
  MESSAGE_TYPE_PATH2,
  MESSAGE_TYPE_POINT,
  MESSAGE_TYPE_POINT2,
  MESSAGE_TYPE_POINTCLOUD2,
  MESSAGE_TYPE_ROS2POINTCLOUD2,
  MESSAGE_TYPE_POSEARRAY,
  MESSAGE_TYPE_POSEARRAY2,
  MESSAGE_TYPE_POSESTAMPED,
  MESSAGE_TYPE_POSESTAMPED2,
  MESSAGE_TYPE_RANGE,
  MESSAGE_TYPE_RANGE2,
  MESSAGE_TYPE_TF2,
  MESSAGE_TYPE_ROS2_TF2,
  MESSAGE_TYPE_WRENCH,
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
} = Amphion.CONSTANTS;

class Visualization extends React.PureComponent {
  constructor(props) {
    super(props);
    this.vizInstance = null;
    this.imageDomRef = React.createRef();
    this.resetVisualization = this.resetVisualization.bind(this);
  }

  static getNewViz(vizType, ros, resourceName, viewer, options) {
    switch (vizType) {
      case VIZ_TYPE_IMAGE_STREAM: {
        return new Amphion.ImageStream(resourceName);
      }
      case VIZ_TYPE_IMAGE: {
        const imageSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_IMAGE,
          queueSize: 1,
          queueLength: 0,
          compression: 'cbor',
        });
        return new Amphion.Image(imageSource, options);
      }
      case VIZ_TYPE_IMAGE2: {
        const imageSource2 = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_IMAGE2,
          queueSize: 1,
          queueLength: 0,
          compression: '',
        });
        return new Amphion.Image2(imageSource2, options);
      }
      case VIZ_TYPE_DEPTHCLOUD_STREAM: {
        return new Amphion.DepthCloud(resourceName);
      }
      case VIZ_TYPE_INTERACTIVEMARKER:
        return new Amphion.InteractiveMarkers(
          ros,
          resourceName,
          viewer,
          options,
        );
        case VIZ_TYPE_INTERACTIVEMARKER2:
          return new Amphion.InteractiveMarkers2(
            ros,
            resourceName,
            viewer,
            options,
          );
      case VIZ_TYPE_LASERSCAN: {
        const laserScanSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_LASERSCAN,
          compression: 'cbor',
        });
        return new Amphion.LaserScan(laserScanSource, options);
      }
      case VIZ_TYPE_LASERSCAN2: {
        const laserScan2Source = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_LASERSCAN2,
          compression: '',
        });
        return new Amphion.LaserScan2(laserScan2Source, options);
      }
      case VIZ_TYPE_MAP: {
        const mapSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_OCCUPANCYGRID,
          compression: 'cbor',
          queueSize: 1,
          queueLength: 0,
        });
        return new Amphion.Map(mapSource, options);
      }
      case VIZ_TYPE_MAP2: {
        const mapSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_OCCUPANCYGRID2,
          compression: '',
          queueSize: 1,
          queueLength: 0,
        });
        return new Amphion.Map2(mapSource, options);
      }
      case VIZ_TYPE_MARKER: {
        const markerSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_MARKER,
        });
        return new Amphion.Marker(markerSource, options);
      }
      case VIZ_TYPE_MARKER2: {
        const markerSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_MARKER2,
        });
        return new Amphion.Marker2(markerSource, options);
      }
      case VIZ_TYPE_MARKERARRAY: {
        const markerArraySource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_MARKERARRAY,
          queueLength: 0,
          queueSize: 1,
        });
        return new Amphion.MarkerArray(markerArraySource, options);
      }
      case VIZ_TYPE_MARKERARRAY2: {
        const markerArraySource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_MARKERARRAY2,
          queueLength: 0,
          queueSize: 1,
        });
        return new Amphion.MarkerArray2(markerArraySource, options);
      }
      case VIZ_TYPE_ODOMETRY: {
        const odometrySource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_ODOMETRY,
        });
        return new Amphion.Odometry(odometrySource, options);
      }
      case VIZ_TYPE_ODOMETRY2: {
        const odometrySource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_ODOMETRY2,
        });
        return new Amphion.Odometry2(odometrySource, options);
      }
      case VIZ_TYPE_PATH: {
        const pathSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_PATH,
        });
        return new Amphion.Path(pathSource, options);
      }
      case VIZ_TYPE_PATH2: {
        const pathSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_PATH2,
        });
        return new Amphion.Path2(pathSource, options);
      }
      case VIZ_TYPE_POINT: {
        const pointSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_POINT,
        });
        return new Amphion.Point(pointSource, options);
      }
      case VIZ_TYPE_POINT2: {
        const pointSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_POINT2,
        });
        return new Amphion.Point2(pointSource, options);
      }
      case VIZ_TYPE_POINTCLOUD: {
        const pointcloudSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_POINTCLOUD2,
          compression: 'cbor',
          queueSize: 1,
          queueLength: 1,
        });
        return new Amphion.PointCloud(pointcloudSource, options);
      }
      case VIZ_TYPE_ROS2POINTCLOUD: {
        const pointcloudSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_ROS2POINTCLOUD2,
          compression: '',
          queueSize: 1,
          queueLength: 1,
        });
        return new Amphion.ROS2PointCloud2(pointcloudSource, options);
      }
      case VIZ_TYPE_POSE: {
        const poseSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_POSESTAMPED,
        });
        return new Amphion.Pose(poseSource, options);
      }
      case VIZ_TYPE_POSE2: {
        const poseSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_POSESTAMPED2,
        });
        return new Amphion.Pose2(poseSource, options);
      }
      case VIZ_TYPE_POSEARRAY: {
        const poseArraySource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_POSEARRAY,
        });
        return new Amphion.PoseArray(poseArraySource, options);
      }
      case VIZ_TYPE_POSEARRAY2: {
        const poseArraySource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_POSEARRAY2,
        });
        return new Amphion.PoseArray2(poseArraySource, options);
      }
      case VIZ_TYPE_RANGE: {
        const rangeSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_RANGE,
        });
        return new Amphion.Range(rangeSource, options);
      }
      case VIZ_TYPE_RANGE2: {
        const rangeSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_RANGE2,
        });
        return new Amphion.Range2(rangeSource, options);
      }
      case VIZ_TYPE_ROBOTMODEL:
        return new Amphion.RobotModel(ros, resourceName, options);
      case VIZ_TYPE_TF: {
        const tfSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_TF2,
        });
        return new Amphion.Tf(tfSource, options);
      }
      case VIZ_TYPE_ROS2_TF: {
        const tfSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_ROS2_TF2,
        });
        return new Amphion.ROS2Tf(tfSource, options);
      }
      case VIZ_TYPE_WRENCH: {
        const wrenchSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_WRENCH,
        });
        return new Amphion.Wrench(wrenchSource, options);
      }
      case VIZ_TYPE_WRENCH2: {
        const wrenchSource = getOrCreateRosTopicDataSource({
          ros,
          topicName: resourceName,
          messageType: MESSAGE_TYPE_WRENCH2,
        });
        return new Amphion.Wrench2(wrenchSource, options);
      }
      default:
        return null;
    }
  }

  componentDidMount() {
    this.resetVisualization();
  }

  componentDidUpdate(prevProps) {
    const {
      options: { topicName, visible, vizType },
      options,
      rosInstance,
      rosTopics,
    } = this.props;
    if (vizType !== prevProps.options.vizType) {
      this.resetVisualization();
    }
    if (vizType === VIZ_TYPE_TF) {
      const currentTfTopics = getTfTopics(rosTopics);
      const prevTfTopics = getTfTopics(prevProps.rosTopics);
      if (
        _.join(_.sortBy(_.map(currentTfTopics, 'name'))) !==
        _.join(_.sortBy(_.map(prevTfTopics, 'name')))
      ) {
        const sources = map(currentTfTopics, topic =>
          getOrCreateRosTopicDataSource({
            ros: rosInstance,
            topicName: topic.name,
            messageType: topic.messageType,
          }),
        );
        this.vizInstance.changeSources(sources);
      }
    } else if (vizType === VIZ_TYPE_ROS2_TF) {
      const currentTfTopics = getROS2TfTopics(rosTopics);
      const prevTfTopics = getROS2TfTopics(prevProps.rosTopics);
      if (
        _.join(_.sortBy(_.map(currentTfTopics, 'name'))) !==
        _.join(_.sortBy(_.map(prevTfTopics, 'name')))
      ) {
        const sources = map(currentTfTopics, topic =>
          getOrCreateRosTopicDataSource({
            ros: rosInstance,
            topicName: topic.name,
            messageType: topic.messageType,
          }),
        );
        this.vizInstance.changeSources(sources);
      }
    } else if (topicName !== prevProps.options.topicName) {
      if (this.vizInstance.changeTopic) {
        // TODO: remove this when all visualizations get ported
        this.vizInstance.changeTopic(topicName);
      } else if (this.vizInstance.changeSources) {
        const source = getOrCreateRosTopicDataSource({
          ...this.vizInstance.options,
          ros: rosInstance,
          topicName,
        });
        this.vizInstance.changeSources([source]);
      }
    }
    if (this.vizInstance) {
      this.vizInstance.updateOptions(options);
    }
    if (visible !== prevProps.options.visible) {
      this.updateVisibility(visible);
    }
  }

  resetVisualization() {
    const {
      id,
      options,
      options: { topicName, visible, vizType },
      rosInstance,
      viewer,
      vizInstances,
    } = this.props;
    if (this.vizInstance) {
      this.vizInstance.destroy();
      vizInstances.delete(this.vizInstance);
    }

    this.vizInstance = Visualization.getNewViz(
      vizType,
      rosInstance,
      topicName,
      viewer,
      options,
    );
    if (!this.vizInstance) {
      return;
    }
    this.vizInstance.key = id;
    vizInstances.add(this.vizInstance);
    if (vizType === VIZ_TYPE_ROBOTMODEL) {
      viewer.addRobot(this.vizInstance);
    } else if (vizType === VIZ_TYPE_IMAGE) {
      this.imageDomRef.current.appendChild(this.vizInstance.object);
      this.vizInstance.subscribe();
    } else if (vizType === VIZ_TYPE_IMAGE_STREAM) {
      this.imageDomRef.current.appendChild(this.vizInstance.object);
      this.vizInstance.subscribe();
    } else {
      viewer.addVisualization(this.vizInstance);
      this.vizInstance.subscribe();
    }
    this.updateVisibility(!_.isBoolean(visible) || visible);
  }

  updateVisibility(visible) {
    if (visible) {
      this.vizInstance.show();
    } else {
      this.vizInstance.hide();
    }
  }

  componentWillUnmount() {
    if (this.vizInstance) {
      this.vizInstance.destroy();
    }
  }

  render() {
    const {
      options: { topicName, visible, vizType },
    } = this.props;

    if (_.includes([VIZ_TYPE_IMAGE_STREAM, VIZ_TYPE_IMAGE], vizType)) {
      return (
        <Rnd
          style={{
            visibility: visible ? 'visible' : 'hidden',
          }}
          default={{
            x: window.innerWidth - 320 - 30, // imageDefaultWidth: 320, imageRight: 30
            y: 30, // imageTop: 30
            width: 320,
            height: 265, // imageDefaultHeight: 240 + 25px header padding,
          }}
          bounds="window"
          onResizeStop={(e, direction, ref) => {
            if (vizType === VIZ_TYPE_IMAGE) {
              this.vizInstance.updateDimensions(
                Number.parseInt(ref.style.width, 10),
                Number.parseInt(ref.style.height, 10) - 25, // -25px for header padding
              );
            }
          }}
        >
          <VizImageContainer ref={this.imageDomRef}>
            <VizImageHeader>Image - {topicName}</VizImageHeader>
          </VizImageContainer>
        </Rnd>
      );
    }
    return null;
  }
}

export default Visualization;
