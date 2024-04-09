"use client";

import { Component, ReactNode, useCallback, useEffect, useState } from "react";
import styles from "./page.module.css";
import { logout, profile } from "@/service/auth/auth-api";
import LocalStorage from "@/lib/localstroage";
import { useRouter } from "next/navigation";
import useModal from "@/lib/hook/useModal";
import CloseDialog from "../components/dialog/CloseDialog";
import { getApplicationsByUserId } from "@/service/application/api";
import { Application } from "@/service/application/interface";
import { getUser } from "@/service/user/api";
import { User } from "@/service/user/interface";
import DashboardHome from "./home/DashboardHome";
import ProfileScreen from "./profile/ProfileScreen";
import SettingScreen from "./settings/SettingScreen";

export default function DashBoard() {}
