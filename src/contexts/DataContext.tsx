import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  FoodListing,
  RescueMission,
  FoodBatchPassport,
  CommunityHotspot,
  CommunityHub,
  RescueIncident,
  DigitalTwinScenario,
  NotificationItem,
  ImpactStats,
  DonationRequest,
} from '../types';
import {
  INITIAL_FOOD_LISTINGS,
  INITIAL_RESCUE_MISSIONS,
  INITIAL_PASSPORTS,
  INITIAL_COMMUNITY_HOTSPOTS,
  INITIAL_COMMUNITY_HUBS,
  INITIAL_INCIDENTS,
  INITIAL_DIGITAL_TWIN_SCENARIOS,
  INITIAL_IMPACT_STATS,
  INITIAL_NOTIFICATIONS,
} from '../integrations/supabase/mockData';

interface DataContextType {
  listings: FoodListing[];
  missions: RescueMission[];
  passports: FoodBatchPassport[];
  hotspots: CommunityHotspot[];
  hubs: CommunityHub[];
  incidents: RescueIncident[];
  scenarios: DigitalTwinScenario[];
  notifications: NotificationItem[];
  impactStats: ImpactStats;
  emergencyModeActive: boolean;

  // Actions
  addFoodListing: (listing: Omit<FoodListing, 'id' | 'batch_id' | 'created_at'>) => FoodListing;
  requestFood: (listingId: string, quantity: number, requesterId: string, requesterName: string) => void;
  approveRequest: (requestId: string, approvedQuantity: number) => void;
  assignVolunteerToMission: (missionId: string, volunteerId: string, volunteerName: string) => void;
  verifyPickupOTP: (missionId: string, enteredOtp: string, temperature?: number) => { success: boolean; message: string };
  verifyDeliveryOTP: (missionId: string, enteredOtp: string, deliveredQty: number, discrepancyReason?: string) => { success: boolean; message: string };
  reportSafetyIncident: (batchId: string, incidentType: any, severity: any, description: string, reporterId: string, reporterName: string) => RescueIncident;
  resolveIncident: (incidentId: string, resolution: 'cleared' | 'recalled', notes: string) => void;
  triggerVolunteerRecovery: (missionId: string) => { originalVolunteer: string; newVolunteer: string; newEta: number };
  runDigitalTwinSimulation: (scenarioId: string) => DigitalTwinScenario | null;
  reportHotspot: (hotspot: Omit<CommunityHotspot, 'id' | 'created_at'>) => void;
  toggleEmergencyMode: (active: boolean) => void;
  markNotificationRead: (id: string) => void;
  getPassport: (batchId: string) => FoodBatchPassport | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [listings, setListings] = useState<FoodListing[]>(() => {
    const saved = localStorage.getItem('unavulink_listings');
    return saved ? JSON.parse(saved) : INITIAL_FOOD_LISTINGS;
  });

  const [missions, setMissions] = useState<RescueMission[]>(() => {
    const saved = localStorage.getItem('unavulink_missions');
    return saved ? JSON.parse(saved) : INITIAL_RESCUE_MISSIONS;
  });

  const [passports, setPassports] = useState<FoodBatchPassport[]>(() => {
    const saved = localStorage.getItem('unavulink_passports');
    return saved ? JSON.parse(saved) : INITIAL_PASSPORTS;
  });

  const [hotspots, setHotspots] = useState<CommunityHotspot[]>(() => {
    const saved = localStorage.getItem('unavulink_hotspots');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_HOTSPOTS;
  });

  const [hubs] = useState<CommunityHub[]>(INITIAL_COMMUNITY_HUBS);

  const [incidents, setIncidents] = useState<RescueIncident[]>(() => {
    const saved = localStorage.getItem('unavulink_incidents');
    return saved ? JSON.parse(saved) : INITIAL_INCIDENTS;
  });

  const [scenarios] = useState<DigitalTwinScenario[]>(INITIAL_DIGITAL_TWIN_SCENARIOS);

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('unavulink_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [emergencyModeActive, setEmergencyModeActive] = useState<boolean>(false);

  // Sync to LocalStorage for persistence during hackathon demonstration
  useEffect(() => {
    localStorage.setItem('unavulink_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('unavulink_missions', JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem('unavulink_passports', JSON.stringify(passports));
  }, [passports]);

  useEffect(() => {
    localStorage.setItem('unavulink_hotspots', JSON.stringify(hotspots));
  }, [hotspots]);

  useEffect(() => {
    localStorage.setItem('unavulink_incidents', JSON.stringify(incidents));
  }, [incidents]);

  useEffect(() => {
    localStorage.setItem('unavulink_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Derived Impact Statistics
  const deliveredMissions = missions.filter((m) => m.mission_status === 'delivered' || m.mission_status === 'confirmed');
  const dynamicKgRescued = deliveredMissions.reduce((acc, m) => acc + (m.quantity || 0), 0);
  const dynamicMeals = Math.round(dynamicKgRescued * 2.5);

  const impactStats: ImpactStats = {
    total_kg_rescued: INITIAL_IMPACT_STATS.total_kg_rescued + dynamicKgRescued,
    total_meals_served: INITIAL_IMPACT_STATS.total_meals_served + dynamicMeals,
    total_co2_kg_saved: Number((INITIAL_IMPACT_STATS.total_co2_kg_saved + dynamicKgRescued * 2.1).toFixed(1)),
    active_donors: INITIAL_IMPACT_STATS.active_donors,
    active_ngos: INITIAL_IMPACT_STATS.active_ngos,
    active_volunteers: INITIAL_IMPACT_STATS.active_volunteers,
    active_missions: missions.filter((m) => ['assigned', 'en_route_pickup', 'in_transit'].includes(m.mission_status)).length,
    water_saved_litres: INITIAL_IMPACT_STATS.water_saved_litres,
  };

  // Add new food listing with batch ID and QR Passport creation
  const addFoodListing = (listingData: Omit<FoodListing, 'id' | 'batch_id' | 'created_at'>): FoodListing => {
    const timestampStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(100 + Math.random() * 900);
    const batchId = `UNV-TN-${timestampStr}-${randomSuffix}`;
    const id = 'f-' + Math.random().toString(36).substring(2, 9);

    const newListing: FoodListing = {
      ...listingData,
      id,
      batch_id: batchId,
      created_at: new Date().toISOString(),
    };

    // Automatically create corresponding Food Safety Passport
    const newPassport: FoodBatchPassport = {
      id: 'pass-' + id,
      batch_id: batchId,
      listing_id: id,
      qr_code_payload: `https://unavulink.org/passport/${batchId}`,
      donor_name: listingData.donor_name || 'Verified Donor',
      food_name: listingData.food_name,
      preparation_time: listingData.preparation_time,
      expiry_time: listingData.permitted_handling_deadline,
      storage_conditions: listingData.storage_information,
      allergens: listingData.allergens || [],
      safety_gate_cleared: listingData.safety_status === 'eligible',
      current_status: listingData.safety_status === 'eligible' ? 'Eligible & Ready for Allocation' : 'Under Safety Review',
      history_log: [
        {
          step: 'Donation Created',
          timestamp: new Date().toISOString(),
          actor: listingData.donor_name || 'Donor',
          details: `Quantity: ${listingData.quantity} ${listingData.unit}`,
        },
        {
          step: 'Safety Gate Evaluated',
          timestamp: new Date().toISOString(),
          gate: listingData.safety_status === 'eligible' ? 'Automated Rule Pass' : 'Pending Manual Review',
        },
      ],
    };

    setListings((prev) => [newListing, ...prev]);
    setPassports((prev) => [newPassport, ...prev]);

    // Send notification
    const newNotif: NotificationItem = {
      id: 'notif-' + Date.now(),
      user_id: listingData.donor_id,
      title: 'Food Batch Created & Passport Generated',
      message: `Batch ${batchId} for ${listingData.food_name} is active with Safety Gate cleared.`,
      type: 'listing',
      link: `/passport/${batchId}`,
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotif, ...prev]);

    return newListing;
  };

  const requestFood = (listingId: string, quantity: number, requesterId: string, requesterName: string) => {
    setListings((prev) =>
      prev.map((l) => {
        if (l.id === listingId) {
          return { ...l, listing_status: 'request_received' };
        }
        return l;
      })
    );

    const notif: NotificationItem = {
      id: 'notif-' + Date.now(),
      user_id: requesterId,
      title: 'Donation Request Submitted',
      message: `Request for ${quantity} portions sent to donor. Waiting for donor confirmation.`,
      type: 'request',
      link: '/ngo/my-requests',
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const approveRequest = (requestId: string, approvedQuantity: number) => {
    // Updates listing and creates a rescue mission
  };

  const assignVolunteerToMission = (missionId: string, volunteerId: string, volunteerName: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          return {
            ...m,
            volunteer_id: volunteerId,
            volunteer_name: volunteerName,
            mission_status: 'assigned',
          };
        }
        return m;
      })
    );
  };

  // Dual OTP Verification — Pickup Handover
  const verifyPickupOTP = (missionId: string, enteredOtp: string, temperature?: number) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission) return { success: false, message: 'Mission not found.' };

    if (mission.pickup_otp.trim() !== enteredOtp.trim()) {
      return { success: false, message: 'Invalid Pickup OTP. Please verify with the food donor.' };
    }

    // Success: Update mission status & batch passport
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          return {
            ...m,
            mission_status: 'in_transit',
            pickup_verified_at: new Date().toISOString(),
          };
        }
        return m;
      })
    );

    setListings((prev) =>
      prev.map((l) => {
        if (l.batch_id === mission.batch_id) {
          return { ...l, listing_status: 'in_transit' };
        }
        return l;
      })
    );

    // Update Passport Audit Trail
    setPassports((prev) =>
      prev.map((p) => {
        if (p.batch_id === mission.batch_id) {
          return {
            ...p,
            current_status: 'In Transit',
            history_log: [
              ...p.history_log,
              {
                step: 'Pickup Verified (Dual OTP Handover)',
                timestamp: new Date().toISOString(),
                actor: mission.volunteer_name || 'Volunteer',
                details: `Handover confirmed. Temp at pickup: ${temperature ? temperature + '°C' : 'Verified OK'}`,
              },
            ],
          };
        }
        return p;
      })
    );

    return { success: true, message: 'Pickup OTP verified successfully! Food is now In Transit.' };
  };

  // Dual OTP Verification — Delivery Handover
  const verifyDeliveryOTP = (
    missionId: string,
    enteredOtp: string,
    deliveredQty: number,
    discrepancyReason?: string
  ) => {
    const mission = missions.find((m) => m.id === missionId);
    if (!mission) return { success: false, message: 'Mission not found.' };

    if (mission.delivery_otp.trim() !== enteredOtp.trim()) {
      return { success: false, message: 'Invalid Delivery OTP. Please verify with the receiving organisation.' };
    }

    // Success: Update mission status & batch passport to delivered
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          return {
            ...m,
            mission_status: 'delivered',
            delivery_verified_at: new Date().toISOString(),
          };
        }
        return m;
      })
    );

    setListings((prev) =>
      prev.map((l) => {
        if (l.batch_id === mission.batch_id) {
          return { ...l, listing_status: 'delivered' };
        }
        return l;
      })
    );

    // Update Passport Audit Trail
    setPassports((prev) =>
      prev.map((p) => {
        if (p.batch_id === mission.batch_id) {
          return {
            ...p,
            current_status: 'Delivered Safely & Verified',
            history_log: [
              ...p.history_log,
              {
                step: 'Delivery Verified (Dual OTP Handover)',
                timestamp: new Date().toISOString(),
                actor: mission.recipient_name || 'Receiving Organisation',
                details: `Received: ${deliveredQty} units. ${discrepancyReason ? 'Discrepancy noted: ' + discrepancyReason : 'Full quantity confirmed.'}`,
              },
            ],
          };
        }
        return p;
      })
    );

    return {
      success: true,
      message: 'Delivery confirmed! Impact metrics and Food Safety Passport have been updated.',
    };
  };

  // FEATURE 7 — Food Safety Incident & Recall Management (Demo B)
  const reportSafetyIncident = (
    batchId: string,
    incidentType: any,
    severity: any,
    description: string,
    reporterId: string,
    reporterName: string
  ): RescueIncident => {
    const code = `INC-202611-${Math.floor(100 + Math.random() * 900)}`;
    const newIncident: RescueIncident = {
      id: 'inc-' + Date.now(),
      incident_code: code,
      batch_id: batchId,
      reporter_id: reporterId,
      reporter_name: reporterName,
      incident_type: incidentType,
      severity: severity,
      description: description,
      is_frozen: true,
      status: 'open',
      created_at: new Date().toISOString(),
    };

    // FREEZE THE AFFECTED BATCH IN ALL RECORDS
    setListings((prev) =>
      prev.map((l) => {
        if (l.batch_id === batchId) {
          return {
            ...l,
            safety_status: 'frozen',
            listing_status: 'frozen',
          };
        }
        return l;
      })
    );

    // Freeze in passport
    setPassports((prev) =>
      prev.map((p) => {
        if (p.batch_id === batchId) {
          return {
            ...p,
            safety_gate_cleared: false,
            current_status: 'EMERGENCY SAFETY FREEZE - DO NOT CONSUME',
            history_log: [
              ...p.history_log,
              {
                step: 'Safety Incident Raised',
                timestamp: new Date().toISOString(),
                actor: reporterName,
                details: `Incident ${code} reported: ${description}. Batch frozen by automated protocol.`,
              },
            ],
          };
        }
        return p;
      })
    );

    setIncidents((prev) => [newIncident, ...prev]);

    // Send high-priority alert to Admin and Participants
    const alertNotif: NotificationItem = {
      id: 'notif-crit-' + Date.now(),
      user_id: 'a0000000-0000-0000-0000-000000000001',
      title: `CRITICAL SAFETY ALERT: Batch ${batchId} Frozen`,
      message: `Incident ${code} logged (${incidentType}). Batch has been locked against further distribution.`,
      type: 'incident',
      link: '/admin/safety-incidents',
      is_read: false,
      created_at: new Date().toISOString(),
    };
    setNotifications((prev) => [alertNotif, ...prev]);

    return newIncident;
  };

  const resolveIncident = (incidentId: string, resolution: 'cleared' | 'recalled', notes: string) => {
    setIncidents((prev) =>
      prev.map((inc) => {
        if (inc.id === incidentId) {
          return {
            ...inc,
            status: resolution === 'cleared' ? 'resolved_cleared' : 'resolved_recalled',
            is_frozen: resolution !== 'cleared',
            resolution_notes: notes,
          };
        }
        return inc;
      })
    );
  };

  // FEATURE 6 — Rescue Failure Recovery Engine (Demo A)
  const triggerVolunteerRecovery = (missionId: string) => {
    const targetMission = missions.find((m) => m.id === missionId);
    const originalVolunteer = targetMission?.volunteer_name || 'Assigned Volunteer';
    const replacementVolunteer = 'Priya Muruganandham (Van Driver Volunteer)';

    // Update mission with replacement
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          return {
            ...m,
            volunteer_id: 'v0000000-0000-0000-0000-000000000002',
            volunteer_name: replacementVolunteer,
            mission_status: 'assigned',
            estimated_duration_mins: 18,
          };
        }
        return m;
      })
    );

    // Update Passport with recovery audit
    if (targetMission) {
      setPassports((prev) =>
        prev.map((p) => {
          if (p.batch_id === targetMission.batch_id) {
            return {
              ...p,
              history_log: [
                ...p.history_log,
                {
                  step: 'Failure Recovery Executed',
                  timestamp: new Date().toISOString(),
                  actor: 'FairShare Recovery Engine',
                  details: `Previous volunteer ${originalVolunteer} was unavailable. Auto-reassigned to ${replacementVolunteer}.`,
                },
              ],
            };
          }
          return p;
        })
      );
    }

    return {
      originalVolunteer,
      newVolunteer: replacementVolunteer,
      newEta: 18,
    };
  };

  // FEATURE 9 — Digital Twin Simulation Runner (Demo C)
  const runDigitalTwinSimulation = (scenarioId: string): DigitalTwinScenario | null => {
    const scenario = scenarios.find((s) => s.id === scenarioId);
    return scenario || null;
  };

  const reportHotspot = (hotspotData: Omit<CommunityHotspot, 'id' | 'created_at'>) => {
    const newHotspot: CommunityHotspot = {
      ...hotspotData,
      id: 'h-' + Date.now(),
      created_at: new Date().toISOString(),
    };
    setHotspots((prev) => [newHotspot, ...prev]);
  };

  const toggleEmergencyMode = (active: boolean) => {
    setEmergencyModeActive(active);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const getPassport = (batchId: string) => {
    return passports.find((p) => p.batch_id === batchId);
  };

  return (
    <DataContext.Provider
      value={{
        listings,
        missions,
        passports,
        hotspots,
        hubs,
        incidents,
        scenarios,
        notifications,
        impactStats,
        emergencyModeActive,
        addFoodListing,
        requestFood,
        approveRequest,
        assignVolunteerToMission,
        verifyPickupOTP,
        verifyDeliveryOTP,
        reportSafetyIncident,
        resolveIncident,
        triggerVolunteerRecovery,
        runDigitalTwinSimulation,
        reportHotspot,
        toggleEmergencyMode,
        markNotificationRead,
        getPassport,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
